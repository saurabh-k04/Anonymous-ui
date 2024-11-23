import { Component, Input, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public hardcodedAuthenticationService : HardcodedAuthenticationService) {}

  ngOnInit(): void {
    
  }

}
