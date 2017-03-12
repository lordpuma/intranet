import {MongoObservable} from "meteor-rxjs";
import {Race} from "../models/race.model";

export const RaceCollection = new MongoObservable.Collection<Race>("races-collection");
let adminUser = (userId) => {
    return Role.userIsInRole(userId, ["admin"]);
};
RaceCollection.allow({
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