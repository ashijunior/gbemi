

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import ValidateForm from '../helpers/validateform';
import { style } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.contactForm.valid && this.checkValidEmail(this.contactForm.value.email)) {
      this.http.post('https://localhost:7269/api/Contact', this.contactForm.value)
        .subscribe({
          next: (res: any) => {
            alert(res.message);
            console.log('Message sent successfully');
            this.resetForm();
          },
          error: (err: any) => {
            console.error('Failed to send message:', err);
            console.log('Error response:', err.error); // Log the full error response
            alert(err?.error?.message || 'An error occurred while sending the message.');
          }
        });
    } else {
      this.handleInvalidForm();
    }
  }

  resetForm(): void {
    this.contactForm.reset();
  }

  handleInvalidForm(): void {
    ValidateForm.validateAllFormFields(this.contactForm);
    alert("Invalid SignUp");
  }

  checkValidEmail(email: string): boolean {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return pattern.test(email);
  }

}



