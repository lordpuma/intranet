import {Component} from "@angular/core";
import {InjectUser} from "angular2-meteor-accounts-ui";
import template from "./app.component.html";
import style from "./app.component.scss";

@Component({
  selector: "app",
  template,
  styles: [ style ]
})
@InjectUser("user")
export class AppComponent {
  user: Meteor.User;
  constructor() {
  }

  //noinspection JSMethodCanBeStatic
  logout(): void {
    Meteor.logout();
  }
}
