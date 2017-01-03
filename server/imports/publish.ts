/**
 * Created by Puma on 01-Jan-17.
 */
import {DemoCollection} from "../../both/collections/demo.collection";
import {WorkplaceCollection} from "../../both/collections/workplace.collection";

export class Publish {
    publish(): void {
        Meteor.publish("demo", () => DemoCollection.find({}));
        Meteor.publish("workplaces", () => WorkplaceCollection.find({}));
        Meteor.publish("users-admin", () => {
            return Meteor.users.find({});
        });
    }
}