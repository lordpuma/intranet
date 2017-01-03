import {Component, OnInit} from "@angular/core";
import template from "./userdetails.tscomponent.html";
import style from "./userdetails.component.scss";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MeteorObservable} from "meteor-rxjs";
import {User} from "../../../../both/models/user.model";
import * as toastr from "toastr";

@Component({
  selector: "userdetails",
  template,
  styles: [ style ]
})
export class UserDetailsComponent implements OnInit {
  username: string;
  userForm: FormGroup;

  user: User;

  constructor(private route: ActivatedRoute,
  private formBuilder: FormBuilder,
  private router: Router) {
    Meteor.subscribe("users-admin");
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.username = params["id"];
      }
    }).unsubscribe();
  }

  save():void {
    if(!this.username){
      MeteorObservable.call("createuser", this.userForm.value.username, this.userForm.value.password,this.userForm.value.first_name,this.userForm.value.last_name)
          .subscribe((username) => {
        toastr.success("Uživatel vytvořen");
        this.router.navigate(["user", username])
      }, (error) => {
        toastr.error(`Nepovedlo se vytvořit uživatele ${error}`, "Error");
      });
    } else {
      MeteorObservable.call("updateuser", this.username, this.userForm.value.first_name,this.userForm.value.last_name, this.userForm.value.password).subscribe(() => {
        toastr.success("Uživatel uložen");
      }, (error) => {
        toastr.error(`Nepovedlo se uložit uživatele ${error}`, "Error");
      });
    }
  }

  ngOnInit() {
    this.user = <User>Meteor.users.findOne({username: this.username});

    this.userForm = this.formBuilder.group({
      username: [""],
      password: [""],
      first_name: [""],
      last_name: [""],
    });

    this.userForm.get("username").disable();
    this.userForm.setValue({username: this.user.username, password: "", first_name: this.user.first_name, last_name: this.user.last_name});

  }
}
