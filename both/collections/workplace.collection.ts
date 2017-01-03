import {MongoObservable} from "meteor-rxjs";
import {Workplace} from "../models/workplace.model";

export const WorkplaceCollection = new MongoObservable.Collection<Workplace>("workplace-collection");
