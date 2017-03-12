import { Component, OnInit } from '@angular/core';
import template from "./results.component.html";
import style from "./results.component.scss";

@Component({
  selector: 'results',
  template,
  styles: [ style ]
})
export class ResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
