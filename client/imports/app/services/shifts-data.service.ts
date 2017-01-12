import {Injectable} from "@angular/core";
import {ObservableCursor} from "meteor-rxjs";
import {Shifts} from "../../../../both/models/shifts.model";
import {ShiftsCollection} from "../../../../both/collections/shifts.collection";

@Injectable()
export class ShiftsDataService {
    private data: ObservableCursor<Shifts>;

    constructor() {
        this.data = ShiftsCollection.find({});
    }

    public getData(): ObservableCursor<Shifts> {
        return this.data;
    }

    public getUser(workplace_id: string, day: number, month: string): ObservableCursor<Shifts> {
        return ShiftsCollection.find({workplace_id: workplace_id, day: day, month: month});
    }

    public getDay(day: number, month: string): ObservableCursor<Shifts> {
        return ShiftsCollection.find({day: day, month: month}, {sort: {workplace_id: 1}});
    }
}
