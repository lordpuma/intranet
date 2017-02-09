import {Component, OnDestroy, OnInit} from "@angular/core";
import {InjectUser} from "angular2-meteor-accounts-ui";
import template from "./app.component.html";
import style from "./app.component.scss";
import {Router} from "@angular/router";
import {User} from "../../../both/models/user.model";
import {MeteorObservable} from "meteor-rxjs";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: "app",
  template,
  styles: [ style ]
})

@InjectUser("user")
export class AppComponent implements OnDestroy, OnInit{
  user: User;
  usersSub: Subscription;
  constructor(private router: Router) {

  }

  //noinspection JSMethodCanBeStatic
  logout(): void {
    Meteor.logout();
    this.router.navigate(["/"]);
  }
  displayname(): string {
    if (this.user.first_name && this.user.last_name) {
      return this.user.first_name + " " + this.user.last_name;
    } else if (this.user.last_name) {
      return this.user.last_name;
    } else return this.user.username;
  }
  ngOnInit() {
    this.usersSub = MeteorObservable.subscribe("user-profile").subscribe();
  }
  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
