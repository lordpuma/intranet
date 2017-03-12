import {MongoObservable} from "meteor-rxjs";
import {Result} from "../models/result.model";

export const ResultCollection = new MongoObservable.Collection<Result>("results-collection");