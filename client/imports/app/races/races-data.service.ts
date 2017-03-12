import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import {Race} from "../../../../both/models/race.model";
import {RaceCollection} from "../../../../both/collections/race.collection";

@Injectable()
export class RacesDataService {
  private data: ObservableCursor<Race>;
  private not_active: ObservableCursor<Race>;

  constructor() {
    this.data = RaceCollection.find({});
    this.not_active = RaceCollection.find({active: false});
  }

  public getData(): ObservableCursor<Race> {
    return this.not_active;
  }

  public getAll(): ObservableCursor<Race> {
    return this.data;
  }

  public getActive(): ObservableCursor<Race> {
    return RaceCollection.find({active: true}, {limit: 1});
  }

  public test() {
    return Meteor.call("test");
  }
}
