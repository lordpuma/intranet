import {Route} from "@angular/router";
import {DemoComponent} from "./demo/demo.component";
import {ShiftsComponent} from "./shifts/shifts.component";
import {UsersListComponent} from "./userslist/userslist.component";
import {UserDetailsComponent} from "./userdetails/userdetails.component";
import {WorkplaceListComponent} from "./workplacelist/workplacelist.component";
import {WorkplaceDetailComponent} from "./workplacedetail/workplacedetail.component";
import {RacesComponent} from "./races/races.component";
import {ResultsComponent} from "./results/results.component";

export const routes: Route[] = [
    {path: "", component: DemoComponent},
    {path: "shifts", component: ShiftsComponent},
    {path: "shifts/:month", component: ShiftsComponent},
    {path: "users", component: UsersListComponent},
    {path: "user/:id", component: UserDetailsComponent},
    {path: "user", component: UserDetailsComponent},
    {path: "races", component: RacesComponent},
    {path: "results", component: ResultsComponent},
    {path: "workplaces", component: WorkplaceListComponent},
    {path: "workplace", component: WorkplaceDetailComponent},
    {path: "workplace/:id", component: WorkplaceDetailComponent},
];