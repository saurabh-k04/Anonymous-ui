import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string = '';
  password: string = '';
  invalidSignup: boolean = false;
  errorMessage: string = '';
  otp: string = '';   // OTP entered by the user
  isOtpSent: boolean = false;  // Controls OTP input visibility
  showResendOtp: boolean = false; // Controls visibility of "Resend OTP"

  constructor(
    private basicAuthenticationService: BasicAuthenticationService,  // Inject the AuthService
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onSubmit(signupForm: NgForm) {
    if (signupForm.invalid) {
      return; // Prevent API call if form is invalid
    }
    this.basicAuthenticationService.sendOtp(this.username, this.password).subscribe(
      response => {
        // console.log('User signed up successfully', response);
        // this.invalidSignup = false;
        // // You could redirect or show a success message here
        // alert(response);
        // this.router.navigate(['login']);  // Redirect to login after successful signup
        // console.log('OTP sent successfully:', response);
        // alert('OTP has been sent to your email. Please check your inbox.');
        // this.isOtpSent = true; // Show OTP input field
        // this.invalidSignup = false;
        console.log('OTP sent successfully', response);
        this.isOtpSent = true;
        this.showResendOtp = false; // Hide resend OTP initially

        // Enable Resend OTP after 30 seconds
        setTimeout(() => {
          this.showResendOtp = true;
        }, 30000);
      },
      error=> {
        // console.error('Error occurred during signup', error);
        // this.invalidSignup = true;
        // this.errorMessage = 'An error occurred. Please try again.';
        console.error('Error sending OTP', error);
        this.invalidSignup = true;
        this.errorMessage = 'Failed to send OTP. Please try again.';
      }
    );
  }

  // ✅ Step 2: Verify OTP and complete signup
  onVerifyOtp() {
    console.log('Verifying OTP for:', this.username, 'Entered OTP:', this.otp);
    this.basicAuthenticationService.verifyOtp(this.username, this.otp).subscribe(
      response => {
        console.log('Signup successful', response);
        alert('Signup successful! You can now log in.');
        this.router.navigate(['login']);
      },
      error => {
        console.error('OTP verification failed', error);
        this.invalidSignup = true;
        this.errorMessage = 'Invalid OTP. Please try again.';
      }
    );
  }

  // Step 3: Resend OTP
  resendOtp() {
    this.basicAuthenticationService.sendOtp(this.username, this.password).subscribe(
      response => {
        console.log('OTP resent successfully', response);
        this.showResendOtp = false; // Hide "Resend OTP" button
        alert('A new OTP has been sent to your email.');

        // Re-enable "Resend OTP" after 30 seconds
        setTimeout(() => {
          this.showResendOtp = true;
        }, 30000);
      },
      error => {
        console.error('Error resending OTP', error);
        alert('Failed to resend OTP. Please try again.');
      }
    );
  }
}
