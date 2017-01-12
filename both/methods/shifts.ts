import {ShiftsCollection} from "../collections/shifts.collection";
/**
 * Created by Puma on 04-Jan-17.
 */
let adminUser = (userId) => {
    return Roles.userIsInRole(userId, ["edit-shifts", "admin"]);
};

Meteor.methods({
    createshift: (day: number, workplace: string, user: string, month: string): void => {
        if (adminUser(Meteor.userId()))
            ShiftsCollection.insert({month: month, day: day, user_id: user, workplace_id: workplace});
    },
    updateshift: (id: string, user_old: string, user_new: string, month: string): void => {
        if (adminUser(Meteor.userId()))
            ShiftsCollection.update(id, {$set: {user_id: user_new}});
    },
    setshiftnote: (id: string, note: string): void => {
        if (adminUser(Meteor.userId()))
            ShiftsCollection.update(id, {$set: {note: note}});
    },
    removeshift: (id: string): void => {
        if (adminUser(Meteor.userId()))
            ShiftsCollection.remove(id);
    },
});