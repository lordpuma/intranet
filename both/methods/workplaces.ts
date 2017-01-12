/**
 * Created by Puma on 03-Jan-17.
 */
import {WorkplaceCollection} from "../collections/workplace.collection";

let adminUser = (userId) => {
    return Roles.userIsInRole(userId, ["admin"]);
};

Meteor.methods({
    createworkplace: (name: string, short_name: string, color: string, bg_color: string): string => {
        if (adminUser(Meteor.userId())) {
            WorkplaceCollection.insert({
                name: name,
                short_name: short_name,
                bg_color: bg_color,
                color: color,
            });
            return name;
        }
    },
    updateworkplace: (id: string, name: string, short_name: string, color: string, bg_color: string): void => {
        if (adminUser(Meteor.userId())) {
            WorkplaceCollection.upsert(id, {
                name: name,
                short_name: short_name,
                bg_color: bg_color,
                color: color,
            });
        }
    },
    removeworkplace: (id: string) => {
        if (adminUser(Meteor.userId())) {
            WorkplaceCollection.remove(id);
        }
    },
});