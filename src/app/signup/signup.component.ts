import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private basicAuthenticationService: BasicAuthenticationService,  // Inject the AuthService
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.basicAuthenticationService.signup(this.username, this.password).subscribe(
      response => {
        console.log('User signed up successfully', response);
        this.invalidSignup = false;
        // You could redirect or show a success message here
        alert(response);
        this.router.navigate(['login']);  // Redirect to login after successful signup
      },
      error=> {
        console.error('Error occurred during signup', error);
        this.invalidSignup = true;
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }
}
