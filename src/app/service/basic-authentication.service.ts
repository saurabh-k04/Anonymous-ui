import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticateUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  private BASE_URL = 'https://anonymousme-backend-new.onrender.com';  // ✅ Define base URL to avoid repetition

  constructor(private router : Router,
    private http : HttpClient
  ) { }

  executeBasicAuthenticationService(username: string, password: string){
    let basicAuthHeaderString = 'Basic '+window.btoa(username + ':' +password);

    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(
      `${this.BASE_URL}/basicauth`,
      {headers}).pipe(
        map (
          (data: any) => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
        )
      )
  }

  executeJWTAuthenticationService(username: string, password: string) {
    return this.http.post<any>(
      `${this.BASE_URL}/authenticate`,
      { username, password }
      ).pipe(
        map (
          (data: any) => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      )
  }

  // ✅ SIGNUP: Sends OTP to email
  signup(username: string, password: string) {
    console.log('Sending OTP to:', username);
    const payload = { username, password };
    return this.http.post<any>(`${this.BASE_URL}/signup`, payload, { responseType: 'text' as 'json' });
  }

  // ✅ Correctly Calls Backend API to Send OTP
  sendOtp(username: string, password: string) {
    console.log('Sending OTP to:', username);
    const payload = { username, password };
    return this.http.post<any>(`${this.BASE_URL}/auth/send-otp`, payload, { responseType: 'text' as 'json' });
  }

  // ✅ OTP VERIFICATION: Completes signup
  verifyOtp(email: string, otp: string) {
    const payload = { email, otp };  // Ensure keys match backend DTO (OtpRequest)
    return this.http.post<any>(`${this.BASE_URL}/auth/verify-otp`, payload, { responseType: 'text' as 'json' });
  }
  

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
    return '';
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN)
    // Redirect to the login page after 5 seconds
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }

  // signup(username: string, password: string) {
  //   console.log("in signup")
  //   const payload = { username, password }; // Create the payload object
  //   console.log("next step")
  //   return this.http.post<any>(`http://localhost:8080/signup`, payload, { responseType: 'text' as 'json' }); // POST request
  // }
}

export class AuthenticationBean{
  constructor(public message:string) { }
}
