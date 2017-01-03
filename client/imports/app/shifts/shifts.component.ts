import {Component, OnInit} from "@angular/core";
import template from "./shifts.component.html";
import style from "./shifts.component.scss";
import * as $ from "jquery";

@Component({
    selector: "shifts",
    template,
    styles: [style]
})
export class ShiftsComponent implements OnInit {


    constructor() {

    }

    ngOnInit() {
        $("#magic2").on("scroll", function () {
            $("#magic1").scrollLeft($(this).scrollLeft());
            $("#magic3").scrollTop($(this).scrollTop());
        });
    }
}
