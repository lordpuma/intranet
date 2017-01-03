import {Component, OnInit, OnDestroy} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {DemoDataService} from "./demo-data.service";
import {Demo} from "../../../../both/models/demo.model";
import {MeteorObservable} from "meteor-rxjs";
import template from "./demo.component.html";
import style from "./demo.component.scss";

@Component({
  selector: "demo",
  template,
  styles: [ style ]
})
export class DemoComponent implements OnInit, OnDestroy {
  greeting: string;
  data: Observable<Demo[]>;
  subscription: Subscription;

  constructor(private demoDataService: DemoDataService) {
    this.greeting = "Hello Demo Component!";
  }

  ngOnInit() {
    this.subscription = MeteorObservable.subscribe("demo").subscribe();
    this.data = this.demoDataService.getData().zone();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
