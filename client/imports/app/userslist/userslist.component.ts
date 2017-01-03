import {Component, OnInit, OnDestroy} from "@angular/core";
import template from "./userslist.component.html";
import style from "./userslist.component.scss";
import {MeteorObservable} from "meteor-rxjs";
import {AutorunObservable} from "angular2-meteor-rxjs";
import {User} from "../../../../both/models/user.model";
import * as toastr from "toastr";


@Component({
    selector: "userslist",
    template,
    styles: [style]
})
export class UsersListComponent implements OnInit, OnDestroy {
    constructor() {

    }

    observable = new AutorunObservable<User[]>(() => {
        Meteor.subscribe("users-admin");
        return Meteor.users.find({});
    });

    remove(id: string, event: Event): void {
        event.preventDefault();
        MeteorObservable.call("removeuser", id).subscribe(() => {
            toastr.success("Uživatel smazán!");
        }, (error) => {
            toastr.error(`Nepovedlo se smazat kvůli ${error}`, "Error!");
        });
    }

    ngOnInit() {

    }


    ngOnDestroy() {

    }
}
