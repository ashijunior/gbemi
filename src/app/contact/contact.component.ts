

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

    contactForm = {
      name: '',
      email: '',
      message: ''
    };

    constructor(private http: HttpClient) {}

    submitForm() {
      this.http.post('https://localhost:7269/api/Contact', this.contactForm)
        .subscribe({
          next: (res: any) => {
            alert(res.message);
            console.log('Message sent successfully');
            this.resetForm();
          },
          error: (err: any)  => {
            console.error('Failed to send message:', err);
            console.log('Error response:', err.error); // Log the full error response
            alert(err?.error?.message || 'An error occurred while sending the message.');
            // alert(err?.error?.message);
            // console.error('Failed to send message.');
          }
        });
    }


    resetForm(): any {
      this.contactForm.name = '';
      this.contactForm.email = '';
      this.contactForm.message = '';
    }

}


