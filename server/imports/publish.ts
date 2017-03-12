/**
 * Created by Puma on 01-Jan-17.
 */
import {DemoCollection} from "../../both/collections/demo.collection";
import {WorkplaceCollection} from "../../both/collections/workplace.collection";
import {ShiftsCollection} from "../../both/collections/shifts.collection";
import {RaceCollection} from "../../both/collections/race.collection";
import {ResultCollection} from "../../both/collections/result.collection";

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
        Meteor.publish("workplaces-shifts", function () {
            if (Roles.userIsInRole(this.userId, ["view-shifts", "admin"])) {
                return WorkplaceCollection.find({}, {fields: {_id: 1, name: 1}});
            }
        });

        Meteor.publish("shifts", function (month: number) {
            if (Roles.userIsInRole(this.userId, ["view-shifts", "admin"])) {
                return ShiftsCollection.find({month: month});
            }
        });
        Meteor.publish("races", function () {
            if (Roles.userIsInRole(this.userId, ["view-shifts", "admin"])) {
                return RaceCollection.find({});
            }
        });
        Meteor.publish("results", function () {
            if (Roles.userIsInRole(this.userId, ["view-shifts", "admin"])) {
                return ResultCollection.find({});
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
        Meteor.publish("users-shifts", function () {
            if (Roles.userIsInRole(this.userId, ["view-shifts", "admin"])) {
                return Meteor.users.find({}, {
                    fields: {
                        first_name: 1,
                        last_name: 1,
                        color: 1,
                        bg_color: 1
                    }
                });
            }
        });
        Meteor.publish("user-profile", function () {
                return Meteor.users.find(this.userId, {
                    fields: {
                        first_name: 1,
                        last_name: 1,
                        color: 1,
                        bg_color: 1,
                        profile: 1
                    }
                });
        });
    }
}