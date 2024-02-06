import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../service/Models/reset-password.model';
import { ConfirmPasswordValidator } from '../helpers/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from '../helpers/validateform';
import { ResetPasswordService } from '../service/reset-password.service';


@Component({
  selector: 'app-rpassword',
  templateUrl: './rpassword.component.html',
  styleUrl: './rpassword.component.css'
})
export class RpasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private resetService: ResetPasswordService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    },{
      validator: ConfirmPasswordValidator("password","confirmPassword")
    });

    this.activatedRoute.queryParams.subscribe(val =>{
      this.emailToReset = val['email'];
      let urlToken = val['code'];
      this.emailToken = urlToken.replace(/ /g,'+');
      console.log(this.emailToken);
      console.log(this.emailToReset);
    })
  }

  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.Email = this.emailToReset;
      this.resetPasswordObj.NewPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.ConfirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.EmailToken = this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.resetForm();
          this.navigateToLogin()
        },
        error:(err)=>{
          alert(err?.error?.message);
        }
      })

    }else{
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }

  resetForm(): void {
    this.resetPasswordForm.reset();
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

}
