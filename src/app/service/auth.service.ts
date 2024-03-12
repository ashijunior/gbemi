import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7269/api/User/"

  constructor(private http :  HttpClient, private router: Router) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  // login(loginObj:any){
  //   return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
  // }

  rememberCredentials(credentials: any): void {
    localStorage.setItem('rememberedCredentials', JSON.stringify(credentials));
  }

  clearRememberedCredentials(): void {
    localStorage.removeItem('rememberedCredentials');
  }

  getRememberedCredentials(): any {
    const rememberedCredentials = localStorage.getItem('rememberedCredentials');
    return rememberedCredentials ? JSON.parse(rememberedCredentials) : null;
  }

  login(loginObj: any) {
    // Try authenticating using HTTP POST request
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj).pipe(
      tap((response) => {
        // If authentication is successful, set token in local storage
        localStorage.setItem('token', response.token);
      })
    );
  }

  signOut(): void {
    // Your logout logic here

    // Remove the token from local storage
    localStorage.removeItem('token');

    // Navigate to the login page after logout
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }



}
