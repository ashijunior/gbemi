import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '../service/reset-password.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  resetPasswordEmail!: string;
  isValidEmail!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private resetService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get emailControl() {
    return this.forgotForm.get('email');
  }

  checkValidEmail(email: string): boolean {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return pattern.test(email);
  }


confirmToSend(): void {
    this.resetPasswordEmail = this.emailControl?.value;
    if (this.checkValidEmail(this.resetPasswordEmail)) {
        this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
            .subscribe({
                next: (res) => {
                    swal({
                        icon: 'success',
                        title: 'Success',
                        text: res.message
                    }).then(() => {
                        this.resetForm();
                        this.navigateToLogin();
                    });
                },
                error: (err) => {
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: err?.error?.message || 'An error occurred while sending the reset password link.'
                    });
                }
            });
    }
}


  resetForm(): void {
    this.forgotForm.reset();
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
