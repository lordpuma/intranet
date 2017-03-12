import {Component, OnInit, OnDestroy} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {RacesDataService} from "./races-data.service";
import {MeteorObservable} from "meteor-rxjs";
import template from "./races.component.html";
import style from "./races.component.scss";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Race} from "../../../../both/models/race.model";

@Component({
  selector: "demo",
  template,
  styles: [ style ]
})
export class RacesComponent implements OnInit, OnDestroy {
  data: Observable<Race[]>;
  subscription: Subscription;
  form: FormGroup;
  active: Observable<Race[]>;

  constructor(private racesDataService: RacesDataService,
  private formBuilder: FormBuilder) {
  }

  save(): void {
    MeteorObservable.call("insertrace", this.form.value.name, this.form.value.active).subscribe(() => {
      this.form.reset();
    })
  }

  activate(id: string): void {
    MeteorObservable.call("activaterace", id).subscribe(() => {
    }, (err) => console.log(err));
  }

  deactivate(): void {
    MeteorObservable.call("deactivaterace").subscribe(() => {
    }, (err) => console.log(err));
  }

  ngOnInit() {
    this.subscription = MeteorObservable.subscribe("races").subscribe();
    this.data = this.racesDataService.getData();
    this.active = this.racesDataService.getActive();
    this.form = this.formBuilder.group({
      name: [""],
      active: [""],
    });
    console.log(this.racesDataService.test());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
