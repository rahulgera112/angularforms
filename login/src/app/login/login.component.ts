import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData = {
    email: "",
    password: "" 
  }
  public show = false
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.userData.email.toLowerCase()
    this._auth.loginUser(this.userData)
      .subscribe(
        (res) => console.log('success'),
        (err) => this.show = !this.show
      )
  }

}
