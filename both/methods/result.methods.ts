import {ResultCollection} from "../collections/result.collection";
import {RaceCollection} from "../collections/race.collection";

Meteor.methods({
    addresult: (name: string, time: number): void => {
        let race = RaceCollection.findOne({active: true});
        if (race._id) {
            let result = ResultCollection.findOne({name: name});
            if(result) {
                ResultCollection.upsert(result._id, {$push: {times: time}})
            } else {
                ResultCollection.insert({name: name, times: [time], race_id: race._id});
            }
        }
    }
});