import {MongoObservable} from "meteor-rxjs";
import {Shifts} from "../models/shifts.model";

export const ShiftsCollection = new MongoObservable.Collection<Shifts>("shifts-collection");
let adminUser = (userId) => {
    return Role.userIsInRole(userId, ["edit-shifts", "admin"]);
};
ShiftsCollection.allow({
    insert: function (userId, doc) {
        return adminUser(userId);
    },
    update: function (userId, doc, fields, modifier) {
        return adminUser(userId);
    },
    remove: function (userId, doc) {
        return adminUser(userId);
    },
});