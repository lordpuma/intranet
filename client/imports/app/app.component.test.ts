// chai uses as asset library
import {assert} from "chai";
// Angular 2 tests imports
import {TestBed, TestModuleMetadata} from "@angular/core/testing";
// Project imports
import {AppComponent} from "./app.component";
import {Observable} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {LocationStrategy} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {DemoComponent} from "./demo/demo.component";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";

describe("AppComponent", () => {
    let shiftsComponentInstance: AppComponent;
    let shiftsComponentElement;
    let componentFixture;

    beforeEach(() => {
        TestBed.configureTestingModule(<TestModuleMetadata>{
            declarations: [AppComponent, DemoComponent, LoginComponent],
            providers: [
                {provide: Router, useClass: null},
                {provide: LocationStrategy, useClass: null},
                {provide: ActivatedRoute, useClass: null}
            ],
            imports: [RouterTestingModule.withRoutes([
                {path: "", component: DemoComponent}
            ]),
                ReactiveFormsModule]
        });

        componentFixture = TestBed.createComponent(AppComponent);
        shiftsComponentInstance = componentFixture.componentInstance;
        shiftsComponentElement = componentFixture.debugElement;
    });

    describe("@Component instance", () => {
        it("Should have a greeting string on the component", () => {
            assert.typeOf(shiftsComponentInstance.greeting, "string", "Greeting should be a string!");
        });

        it("Should say hello to the component on the greeting string", () => {
            assert.equal(shiftsComponentInstance.greeting, "Hello Demo Component!");
        });

        it("Should have an Observable (from the mock) of the instance", () => {
            shiftsComponentInstance.ngOnInit();
            assert.isTrue(shiftsComponentInstance.data instanceof Observable);
        });

        it("Should have an items in the Observable", (done) => {
            shiftsComponentInstance.ngOnInit();
            assert.isTrue(shiftsComponentInstance.data instanceof Observable);

            shiftsComponentInstance.data.subscribe((data) => {
                assert.equal(data.length, 1);
                assert.typeOf(data, "array");

                done();
            });
        });
    });

    describe("@Component view", () => {
        it("Should print the greeting to the screen", () => {
            componentFixture.detectChanges();
            assert.include(shiftsComponentElement.nativeElement.innerHTML, "Hello Demo Component");
        });

        it("Should change the greeting when it changes", () => {
            componentFixture.detectChanges();
            assert.include(shiftsComponentElement.nativeElement.innerHTML, "Hello Demo Component");
            shiftsComponentInstance.greeting = "New Test Greeting";
            componentFixture.detectChanges();
            assert.include(shiftsComponentElement.nativeElement.innerHTML, "New Test Greeting");
        });

        it("Should display a list of items in the screen", () => {
            componentFixture.detectChanges();
            assert.isNotNull(shiftsComponentElement.nativeElement.querySelector("ul"));
        });
    });
});
