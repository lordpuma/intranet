/**
 * Created by Puma on 03-Jan-17.
 */
import {WorkplaceCollection} from "../collections/workplace.collection";

Meteor.methods({
    createworkplace: (name: string, short_name: string, color: string, bg_color: string): string => {
        WorkplaceCollection.insert({
            name: name,
            short_name: short_name,
            bg_color: bg_color,
            color: color,
        });
        return name;
    },
    updateworkplace: (id: string, name: string, short_name: string, color: string, bg_color: string): void => {
        WorkplaceCollection.upsert(id, {
            name: name,
            short_name: short_name,
            bg_color: bg_color,
            color: color,
        });
    },
    removeworkplace: (id: string) => {
        WorkplaceCollection.remove(id);
    },
});