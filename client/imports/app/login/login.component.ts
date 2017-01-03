import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {FormGroup, FormBuilder, Validator} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import template from "./login.component.html";
import style from "./login.component.scss";
import {MeteorObservable} from "meteor-rxjs";

@Component({
  selector: "login",
  template,
  styles: [ style ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [""],
      pass: [""],
    });
  }

  login(): void {
    // Accounts.createUser({username: this.addForm.value.email, password: this.addForm.value.password}, (err) => console.log(err));
    Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.pass, (err) => {
      if (!err)
        this.router.navigate(["/shifts"]);

      console.log(err);
    });
  }

}
