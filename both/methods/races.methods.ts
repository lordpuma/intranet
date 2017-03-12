import {RaceCollection} from "../collections/race.collection";
Meteor.methods({
    insertrace: (name: string, active: boolean): void => {
        if (active === true) {
            Meteor.call("deactivaterace");
        }
        RaceCollection.insert({name: name, active: active});
    },
    activaterace: (id: string): void => {
        RaceCollection.update({}, {$set: {active: false}});
        RaceCollection.upsert(id, {$set: {active: true}});
    },
    deactivaterace: (): void => {
        RaceCollection.update({active: true}, {$set: {active: false}});
    },
});