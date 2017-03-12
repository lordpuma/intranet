"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("angular2-meteor-polyfills");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var app_1 = require("./imports/app");
core_1.enableProdMode();
Meteor.startup(function () {
    platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_1.AppModule).then();
});
