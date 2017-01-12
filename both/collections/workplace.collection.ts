import {MongoObservable} from "meteor-rxjs";
import {Workplace} from "../models/workplace.model";

export const WorkplaceCollection = new MongoObservable.Collection<Workplace>("workplace-collection");
let adminUser = (userId) => {
    return Role.userIsInRole(userId, ["admin"]);
};
WorkplaceCollection.allow({
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