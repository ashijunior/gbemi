import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initLoginForm();

        // Load remembered credentials if available
        const rememberedCredentials = this.auth.getRememberedCredentials();
        if (rememberedCredentials) {
          this.loginForm.patchValue(rememberedCredentials);
        }

  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false] // Initialize rememberMe control
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      if (formData.rememberMe) {
        // Remember credentials
        this.auth.rememberCredentials(formData);
      } else {
        // Clear remembered credentials
        this.auth.clearRememberedCredentials();
      }
      // Proceed with login
      this.auth.login(formData).subscribe({
        next: (res: any) => {
          // Login success logic
          // You can navigate to home page here
          this.router.navigate(['home']);
        },
        error: (err: any) => {
          // Login error handling
          alert(err?.error?.message);
        }
      });
    } else {
      this.validateForm(); // Validate form fields
      alert("Invalid Login"); // Display error message
    }
  }
  
  // onLogin(): void {
  //   if (this.loginForm.valid) {
  //     this.auth.login(this.loginForm.value)
  //       .subscribe({
  //         next: (res: any) => {
  //           //alert(res.message); // Display success message
  //           this.loginForm.reset(); // Reset form
  //           this.router.navigate(['home']); // Navigate to home page
  //         },
  //         error: (err: any) => {
  //           alert(err?.error?.message); // Display error message
  //         }
  //       });
  //   } else {
  //     this.validateForm(); // Validate form fields
  //     alert("Invalid Login"); // Display error message
  //   }
  // }

  private validateForm(): void {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true }); // Mark all fields as touched
      }
    });
  }
}
