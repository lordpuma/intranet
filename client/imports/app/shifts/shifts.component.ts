import {Component, OnInit, OnDestroy} from "@angular/core";
import template from "./shifts.component.html";
import style from "./shifts.component.scss";
import * as $ from "jquery";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Workplace} from "../../../../both/models/workplace.model";
import {MeteorObservable} from "meteor-rxjs";
import {WorkplaceDataService} from "../services/workplace-data.service";
import {Shifts} from "../../../../both/models/shifts.model";
import {ShiftsDataService} from "../services/shifts-data.service";
import {User} from "../../../../both/models/user.model";
import * as _ from "lodash";
import {Users} from "../../../../both/collections/users.collection";
import SubscriptionHandle = Meteor.SubscriptionHandle;

@Component({
    selector: "shifts",
    template,
    styles: [style]
})
export class ShiftsComponent implements OnInit, OnDestroy {
    month: string;
    workplaces: Observable<Workplace[]>;
    workplaces_sub: Subscription;
    days_number: number;
    days: number[];
    parameter_sub: Subscription;
    shifts: Observable<Shifts[]>;
    shifts_sub: Subscription;

    users: Observable<User>;
    usersSub: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private workplace_service: WorkplaceDataService,
                private shifts_service: ShiftsDataService) {
        this.parameter_sub = this.route.params.subscribe((params) => {
            if (params["month"]) {
                this.month = params["month"];
                this.days_number = this.daysInMonth(this.month);
                this.days = Array(this.days_number).fill(1).map((x, i) => i + 1); // [0,1,2,3,4];
            }
        });
        if (!this.month) {
            let date = new Date;
            this.router.navigate(["/shifts", date.toISOString().substr(0, 7)]);
        }
    }

    switchWeek(date: Date) {
        this.router.navigate(["/shifts", date.toISOString().substr(0, 7)]);
    }

    daysInMonth(date) {
        let d = new Date(date);
        d.setMonth(d.getMonth() + 1, 0);
        return d.getDate();
    }

    getUsers(workplace_id: string, day: number) {
        return this.shifts_service.getUser(workplace_id, day, this.month).fetch();
    }

    getUserCount(workplace_id: string, day: number) {
        return this.getUsers(workplace_id, day).length;
    }

    getUserCountAll(day: number) {
        return (_.max(_.values(_.countBy(this.shifts_service.getDay(day, this.month).fetch(), "workplace_id")))) ? _.max(_.values(_.countBy(this.shifts_service.getDay(day, this.month).fetch(), "workplace_id"))) : 1;
    }

    userById(id: Shifts) {
        return Users.find(id.user_id).fetch()[0];
    }

    usersByWorkplace(id: string) {
        return Users.find({positions: id});
    }

    changeUser(shift: Shifts, users: { user_old: string, user_new: string }) {
        MeteorObservable.call("updateshift", shift._id, users.user_old, users.user_new, this.month).subscribe(() => {
        }, (err) => console.log(err));
    }

    setUser(day: number, workplace: string, user: string) {
        MeteorObservable.call("createshift", day, workplace, user, this.month).subscribe(() => {
        }, (err) => console.log(err));
    }

    deleteShift(shift: Shifts) {
        MeteorObservable.call("removeshift", shift._id).subscribe(() => {
        }, (err) => console.log(err));
    }


    ngOnInit() {
        this.usersSub = MeteorObservable.subscribe("users").subscribe();
        this.shifts_sub = MeteorObservable.subscribe("shifts").subscribe();
        this.shifts = this.shifts_service.getData();
        this.workplaces_sub = MeteorObservable.subscribe("workplaces").subscribe();
        this.workplaces = this.workplace_service.getData();
        $("#magic2").on("scroll", _.throttle(function()
        {
            $("#magic1").scrollLeft($(this).scrollLeft());
            $("#magic3").scrollTop($(this).scrollTop());
        }, 200));
    }

    ngOnDestroy() {
        this.workplaces_sub.unsubscribe();
        this.parameter_sub.unsubscribe();
        this.shifts_sub.unsubscribe();
        this.usersSub.unsubscribe();
    }
}
