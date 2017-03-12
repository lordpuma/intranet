import {Injectable} from "@angular/core";
import {ObservableCursor} from "meteor-rxjs";
import {Result} from "../../../both/models/result.model";
import {ResultCollection} from "../../../both/collections/result.collection";
@Injectable()
export class ResultDataService {
  private data: ObservableCursor<Result>;

  constructor() {
    this.data = ResultCollection.find({});
  }

  public getData(): ObservableCursor<Result> {
    return this.data;
  }

  public getRace(id: string): ObservableCursor<Result> {
    return ResultCollection.find({race_id: id});
  }
}
