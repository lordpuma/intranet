import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import template from "./workplacedetail.component.html";
import style from "./workplacedetail.component.scss";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MeteorObservable} from "meteor-rxjs";
import {Workplace} from "../../../../both/models/workplace.model";
import {WorkplaceCollection} from "../../../../both/collections/workplace.collection";
import * as toastr from "toastr";

@Component({
    selector: "workplacedetail",
    template,
    styles: [style]
})
export class WorkplaceDetailComponent implements OnInit, OnDestroy {
    workplaceForm: FormGroup;
    workplaceName: string;
    workplace: Workplace;
    subscription: Subscription;


    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router) {
        this.route.params.subscribe((params) => {
            if (params["id"]) {
                this.workplaceName = params["id"];
            }
        }).unsubscribe();
    }

    save(): void {
        if (!this.workplace) {
            MeteorObservable.call("createworkplace", this.workplaceForm.value.name, this.workplaceForm.value.short_name, this.workplaceForm.value.color, this.workplaceForm.value.bg_color).subscribe((username) => {
                toastr.success("Pracoviště uloženo!");
                this.router.navigate(["workplace", username])
            }, (error) => {
                toastr.error(`Pracoviště se nepovedlo vytvořit! ${error}`, "Error!");
            });

        } else {
            MeteorObservable.call("updateworkplace", this.workplace._id, this.workplaceForm.value.name, this.workplaceForm.value.short_name, this.workplaceForm.value.color, this.workplaceForm.value.bg_color).subscribe(() => {
                this.router.navigate(["workplace", this.workplaceForm.value.name]);
                toastr.success("Pracoviště uloženo!");
            }, (error) => {
                toastr.error(`Pracoviště se nepovedlo uložit! ${error}`, "Error!");
            });
        }
    }

    ngOnInit() {
        this.subscription = MeteorObservable.subscribe("workplaces").subscribe(() => {
            if (this.workplaceName) {
                this.workplace = WorkplaceCollection.findOne({name: this.workplaceName});
                this.workplaceForm.setValue({
                    name: this.workplace.name,
                    short_name: this.workplace.short_name,
                    color: this.workplace.color,
                    bg_color: this.workplace.bg_color
                });
            }

        });

        this.workplaceForm = this.formBuilder.group({
            name: [""],
            short_name: [""],
            color: ["#FFFFFF"],
            bg_color: ["#000000"],
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
