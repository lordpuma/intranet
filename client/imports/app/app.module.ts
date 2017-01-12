import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {DemoComponent} from "./demo/demo.component";
import {ShiftsComponent} from "./shifts/shifts.component";
import {LoginComponent} from "./login/login.component";
import {DemoDataService} from "./demo/demo-data.service";
import {AccountsModule} from "angular2-meteor-accounts-ui";
import {routes} from "./app.routes";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersListComponent} from "./userslist/userslist.component";
import {UserDetailsComponent} from "./userdetails/userdetails.component";
import {WorkplaceListComponent} from "./workplacelist/workplacelist.component";
import {WorkplaceDetailComponent} from "./workplacedetail/workplacedetail.component";
import {WorkplaceDataService} from "./services/workplace-data.service";
import {ShiftsButtonComponent} from "./shiftsbutton/shiftsbutton.component";
import {ShiftsDataService} from "./services/shifts-data.service";

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    DemoComponent,
    ShiftsComponent,
      ShiftsButtonComponent,
    LoginComponent,
    UsersListComponent,
    UserDetailsComponent,
    WorkplaceListComponent,
    WorkplaceDetailComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
      DemoDataService,
      ShiftsDataService,
      WorkplaceDataService
  ],
  // Modules
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}

