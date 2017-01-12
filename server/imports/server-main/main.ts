import {DemoCollection} from "../../../both/collections/demo.collection";
import {Demo} from "../../../both/models/demo.model";
import {Publish} from "../publish";

const publish = new Publish();

export class Main {
  start(): void {
    this.initFakeData();
    this.defaultUser();
      publish.publish();
  }

  initFakeData(): void {
    if (DemoCollection.find({}).cursor.count() === 0) {
      const data: Demo[] = [{
        name: "Dotan",
        age: 25
      }, {
        name: "Liran",
        age: 26
      }, {
        name: "Uri",
        age: 30
      }];
      data.forEach((obj: Demo) => {
        DemoCollection.insert(obj);
      });
    }
  }

  defaultUser(): void {
    if (Meteor.users.find({}).count() === 0) {
      Roles.setUserRoles(Accounts.createUser({
        username: "admin",
        email: "admin@admin.com",
        password: "admin"
      }), ["admin"]);
    }
  }
}
