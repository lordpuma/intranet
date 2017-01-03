import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription, Observable} from "rxjs";
import template from "./workplacelist.component.html";
import style from "./workplacelist.component.scss";
import {MeteorObservable} from "meteor-rxjs";
import {Workplace} from "../../../../both/models/workplace.model";
import {WorkplaceCollection} from "../../../../both/collections/workplace.collection";
import * as toastr from "toastr";

@Component({
    selector: "workplacelist",
    template,
    styles: [style]
})
export class WorkplaceListComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    workplaces: Observable<Workplace[]>;

    constructor() {

    }

    remove(id: string, event: Event): void {
        event.preventDefault();

        MeteorObservable.call("removeworkplace", id).subscribe(() => {
            toastr.success("Pracoviště smazáno!");
        }, (error) => {
            toastr.error("Failed to delete due to ${error}", "Error!");
        });
    }

    ngOnInit() {
        this.workplaces = WorkplaceCollection.find({}).zone();
        this.subscription = MeteorObservable.subscribe("workplaces").subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();

    }
}
