import {Injectable} from "@angular/core";
import {ObservableCursor} from "meteor-rxjs";
import {WorkplaceCollection} from "../../../../both/collections/workplace.collection";

@Injectable()
export class WorkplaceDataService {
    private data: ObservableCursor<any>;

    constructor() {
        this.data = WorkplaceCollection.find({});
    }

    public getData(): ObservableCursor<any> {
        return this.data;
    }
}
