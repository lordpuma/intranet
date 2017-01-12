import {MongoObservable} from "meteor-rxjs";
import {Demo} from "../models/demo.model";

export const DemoCollection = new MongoObservable.Collection<Demo>("demo-collection");
let adminUser = (userId) => {
    return Role.userIsInRole(userId, ["edit-users", "admin"]);
};
DemoCollection.allow({
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