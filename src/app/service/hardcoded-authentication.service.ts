import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor(private router : Router) { }

  authenticate(username: string, password: string){
    if(username === 'saurabh' && password === 'saurabh'){
      sessionStorage.setItem('authenticateUser', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticateUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticateUser');
    // Redirect to the login page after 5 seconds
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }
}
