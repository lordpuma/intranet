import {RaceCollection} from "../collections/race.collection";
/**
 * Created by Puma on 02-Jan-17.
 */
let adminUser = (userId) => {
    return Roles.userIsInRole(userId, ["admin"]);
};

Meteor.methods({
    updateuser: (username: string, first_name: string, last_name: string, color: string, bg_color: string, positions: [string], roles: [string], password?: string) => {
        if (adminUser(Meteor.userId())) {
            check(first_name, String);
            check(last_name, String);
            if (password)
                check(password, String);
            check(username, String);
            check(color, String);
            check(bg_color, String);
            check(positions, [String]);
            check(positions, [String]);

            let user = Meteor.users.findOne({username: username});
            Roles.setUserRoles(user, roles);

            if (user) {
                if (password !== "") {
                    Accounts.setPassword(user._id, password);
                }

                Meteor.users.update(user._id, {
                    $set: {
                        first_name: first_name,
                        last_name: last_name,
                        color: color,
                        bg_color: bg_color,
                        positions: positions
                    }
                });
            }
            else {
                console.log("User wasn't found, propably because it was ran on client");
            }
        }
    },

    createuser: (username: string, password: string, first_name: string, last_name: string, color: string, bg_color: string, positions: [string], roles: [string]) => {
        if (adminUser(Meteor.userId())) {
            check(first_name, String);
            check(last_name, String);
            check(password, String);
            check(username, String);
            check(color, String);
            check(bg_color, String);
            check(positions, [String]);
            check(positions, [String]);

            let id = Accounts.createUser({username: username, password: password});

            let user = Meteor.users.findOne(id);


            if (user) {
                Meteor.users.update(user._id, {
                    $set: {
                        first_name: first_name,
                        last_name: last_name,
                        color: color,
                        bg_color: bg_color,
                        positions: positions
                    }
                });
                Roles.setUserRoles(user, roles);
            }
            else {
                console.log("User wasn't found, propably because it was ran on client");
            }

            return user.username;
        }
    },

    removeuser: (id: string) => {
        if (adminUser(Meteor.userId())) {
            Meteor.users.remove(id);
        }
    },

    // test: () => {
    //     if (Meteor.isServer)
    //         RaceCollection.collection.rawCollection().aggregate({}, {}).each(result => console.log(result)); // WHICH WORKS
    //     return true;
    // }
});