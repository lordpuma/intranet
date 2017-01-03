import {Injectable} from "@angular/core";
import {ObservableCursor} from "meteor-rxjs";
import {Workplace} from "../../../../both/models/workplace.model";
import {WorkplaceCollection} from "../../../../both/collections/workplace.collection";

@Injectable()
export class WorkplaceDataService {
    private data: ObservableCursor<Workplace>;

    constructor() {
        this.data = WorkplaceCollection.find({});
    }

    public getData(): ObservableCursor<Workplace> {
        return this.data;
    }
}
