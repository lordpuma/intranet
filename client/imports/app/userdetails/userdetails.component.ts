import {Component, OnInit} from "@angular/core";
import template from "./userdetails.component.html";
import style from "./userdetails.component.scss";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MeteorObservable} from "meteor-rxjs";
import {User} from "../../../../both/models/user.model";
import * as toastr from "toastr";
import {Observable, Subscription} from "rxjs";
import {WorkplaceDataService} from "../services/workplace-data.service";
import {Workplace} from "../../../../both/models/workplace.model";

@Component({
    selector: "userdetails",
    template,
    styles: [style]
})
export class UserDetailsComponent implements OnInit {
    username: string;
    userForm: FormGroup;
    workplaces: Observable<Workplace[]>;
    workplaces_sub: Subscription;

    user: User;

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router,
                private workplace_service: WorkplaceDataService) {
        Meteor.subscribe("users-admin");
        this.route.params.subscribe((params) => {
            if (params["id"]) {
                this.username = params["id"];
            }
        }).unsubscribe();
    }

    save(): void {
        if (!this.username) {
            MeteorObservable.call("createuser", this.userForm.value.username, this.userForm.value.password, this.userForm.value.first_name, this.userForm.value.last_name, this.userForm.value.color, this.userForm.value.bg_color, this.userForm.value.positions, this.userForm.value.roles)
                .subscribe((username) => {
                    toastr.success("Uživatel vytvořen");
                    this.router.navigate(["user", username]);
                }, (error) => {
                    toastr.error(`Nepovedlo se vytvořit uživatele ${error}`, "Error");
                });
        } else {
            MeteorObservable.call("updateuser", this.username, this.userForm.value.first_name, this.userForm.value.last_name, this.userForm.value.color, this.userForm.value.bg_color, this.userForm.value.positions, this.userForm.value.roles, this.userForm.value.password).subscribe(() => {
                toastr.success("Uživatel uložen");
            }, (error) => {
                toastr.error(`Nepovedlo se uložit uživatele ${error}`, "Error");
            });
        }
    }

    ngOnInit() {
        if (Roles.subscription.ready()) {
            console.log(Roles.userIsInRole(Meteor.userId(), ["view-shifts", "admin"]));
            console.log(Roles.getRolesForUser(Meteor.userId()));
            console.log(Roles.subscription.ready());
        }

        this.user = <User>Meteor.users.findOne({username: this.username});
        this.workplaces_sub = MeteorObservable.subscribe("workplaces").subscribe();
        this.workplaces = this.workplace_service.getData();

        this.userForm = this.formBuilder.group({
            username: [""],
            password: [""],
            first_name: [""],
            last_name: [""],
            color: [""],
            bg_color: [""],
            positions: [""],
            roles: [""],
        });
        if (this.user) {
            this.userForm.get("username").disable();
            this.userForm.setValue({
                username: this.user.username,
                password: "",
                first_name: this.user.first_name ? this.user.first_name : "",
                last_name: this.user.last_name ? this.user.last_name : "",
                color: this.user.color ? this.user.color : "",
                bg_color: this.user.bg_color ? this.user.bg_color : "",
                positions: this.user.positions ? this.user.positions : "",
                roles: Roles.getRolesForUser(this.user),
            });
        }
    }
}
