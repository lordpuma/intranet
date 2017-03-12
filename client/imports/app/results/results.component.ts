import {Component, OnDestroy, OnInit} from '@angular/core';
import template from "./results.component.html";
import style from "./results.component.scss";
import {Observable, Subscription} from "rxjs";
import {Race} from "../../../../both/models/race.model";
import {Result} from "../../../../both/models/result.model";
import {RacesDataService} from "../races/races-data.service";
import {ResultDataService} from "../result-data.service";
import {MeteorObservable} from "meteor-rxjs";

@Component({
  selector: 'results',
  template,
  styles: [ style ]
})
export class ResultsComponent implements OnInit, OnDestroy {
  races: Observable<Race[]>;
  results: Observable<Result[]>;
  races_sub: Subscription;
  results_sub: Subscription;
  selected_race: string = "";
  selected: string;

  constructor(
      private racesDataService: RacesDataService,
      private resultDataService: ResultDataService,
  ) { }

  ngOnInit() {
    this.results_sub = MeteorObservable.subscribe("results").subscribe();
    this.races_sub = MeteorObservable.subscribe("races").subscribe();
    this.races = this.racesDataService.getAll() ;
    this.results = this.resultDataService.getRace(this.selected_race);
  }

  ngOnDestroy() {
    this.results_sub.unsubscribe();
    this.races_sub.unsubscribe();
  }

}
