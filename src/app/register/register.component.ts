import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import ValidateForm from '../helpers/validateform';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message);
            this.resetForm();
            this.navigateToLogin();
          },
          error: (err) => {
            alert(err?.error.message);
          }
        });
    } else {
      this.handleInvalidForm();
    }
  }

  resetForm(): void {
    this.signUpForm.reset();
  }

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

  handleInvalidForm(): void {
    ValidateForm.validateAllFormFields(this.signUpForm);
    alert("Invalid SignUp");
  }

}
