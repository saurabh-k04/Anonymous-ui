import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  username = 'saurabh';
  password = '';
  errorMessage = 'Invalid Credientials';
  invalidLogin = false;

  constructor(private router : Router,
    private hardcodedAuthenticationService : HardcodedAuthenticationService,
    private basicAuthenticationService : BasicAuthenticationService) {

  }

  ngOnInit(): void {
    
  }

  handleLogin(){
    //console.log(this.username);
    if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)){
      this.router.navigate(['dashboard']);
      this.invalidLogin = false;
    }else{
      this.invalidLogin = true;
    }
  }
  
  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeBasicAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          this.router.navigate(['dashboard']);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
        }
      )
  }
}
