import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import template from "./shiftsbutton.component.html";
import style from "./shiftsbutton.component.scss";
import {User} from "../../../../both/models/user.model";
// import { default as swal } from "sweetalert2";
import {SweetAlertService} from "ng2-sweetalert2";
import {MeteorObservable} from "meteor-rxjs";
import undefined = Match.undefined;

@Component({
    selector: "shiftsbutton",
    template,
    styles: [style],
    providers: [SweetAlertService]
})
export class ShiftsButtonComponent implements OnInit {
    @Input() user: User = {
        username: "",
        first_name: "",
        last_name: "VOLNO",
        color: "#ffffff",
        bg_color: "#555555",
        positions: [""]
    };
    @Input() note: string = "";
    @Input() id: string = "";
    @Input() usersList: Observable<User[]>;
    @Output() onChange = new EventEmitter<{user_new: string, user_old: string}>();
    @Output() onCreate = new EventEmitter<string>();
    @Output() onDelete = new EventEmitter<boolean>();
    @Output() onNote = new EventEmitter<boolean>();
    isAdmin: boolean;

    constructor(private swal: SweetAlertService) {
    }

    ngOnInit() {
        this.isAdmin = Roles.userIsInRole(Meteor.userId(), ["edit-shifts", "admin"]);
    }

    getName() {
        if (this.user) {
            if (this.user.first_name !== "" && this.user.first_name !== undefined) {
                return this.user.first_name.substr(0, 1) + ". " + this.user.last_name;
            }
            return this.user.last_name;
        } else {
            return "VOLNO";
        }
    }

    changeUser(user_new: string, e: Event) {
        if (this.user._id) {
            if (user_new !== this.user._id)
                this.onChange.emit({user_new: user_new, user_old: this.user._id});
        } else {
            this.onCreate.emit(user_new);
        }
        e.preventDefault();
    }

    setUser(user_new: string, e: Event) {
        if (user_new !== this.user._id)
            this.onCreate.emit(user_new);
        e.preventDefault();
    }

    delete_self(e: Event) {
        this.onDelete.emit(null);
        e.preventDefault();
    }

    editNote(e: Event) {
        if (this.isAdmin) {
            let self = this;
            this.swal.swal(({
                title: "Upravit poznámku",
                input: "text",
                showCancelButton: true,
                confirmButtonText: "Submit",
                allowOutsideClick: false
            })).then(function (text: string) {
                    self.emitEditNote(text);
                }
            );
        }
    }

    emitEditNote(text: string) {
        MeteorObservable.call("setshiftnote", this.id, text).subscribe(() => {
        }, (err) => console.log(err));
    }
}
