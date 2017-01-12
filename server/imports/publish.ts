/**
 * Created by Puma on 01-Jan-17.
 */
import {DemoCollection} from "../../both/collections/demo.collection";
import {WorkplaceCollection} from "../../both/collections/workplace.collection";
import {ShiftsCollection} from "../../both/collections/shifts.collection";

let adminUser = (userId) => {
    return Role.userIsInRole(userId, ["edit-shifts", "admin"]);
};

export class Publish {
    publish(): void {
        Meteor.publish("demo", function () {
            DemoCollection.find({});
        });
        Meteor.publish("workplaces", function () {
            if (Roles.userIsInRole(this.userId, ["view-shifts", "admin"])) {
                return WorkplaceCollection.find({});
            }
        });
        Meteor.publish("shifts", function () {
            if (Roles.userIsInRole(this.userId, ["view-shifts", "admin"])) {
                return ShiftsCollection.find({});
            }
        });
        Meteor.publish("users-admin", function () {
            if (Roles.userIsInRole(this.userId, ["edit-users", "admin"])) {
                return Meteor.users.find({});
            }
        });
        Meteor.publish("users", function () {
            if (Roles.userIsInRole(this.userId, ["view-shifts", "admin"])) {
                return Meteor.users.find({}, {
                    fields: {
                        first_name: 1,
                        last_name: 1,
                        color: 1,
                        bg_color: 1,
                        profile: 1,
                        positions: 1,
                    }
                });
            }
        });
    }
}