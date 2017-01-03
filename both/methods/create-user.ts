/**
 * Created by Puma on 02-Jan-17.
 */

Meteor.methods({
    updateuser: (username: string, first_name: string, last_name: string, password?: string) => {
        check(first_name, String);
        check(last_name, String);
        if (password)
            check(password, String);
        check(username, String);

        let user = Meteor.users.findOne({username: username});

        if (user) {
            if (password !== "") {
                Accounts.setPassword(user._id, password);
            }

            Meteor.users.update(user._id, {$set: {first_name: first_name, last_name: last_name}});
        }
        else {
            console.log("User wasn't found, propably because it was ran on client");
        }

    },

    createuser: (username: string, password: string, first_name: string, last_name: string) => {
        check(first_name, String);
        check(last_name, String);
        check(password, String);
        check(username, String);

        let id = Accounts.createUser({username: username, password: password});

        let user = Meteor.users.findOne(id);


        if (user) {
            Meteor.users.update(user._id, {$set: {first_name: first_name, last_name: last_name}});
        }
        else {
            console.log("User wasn't found, propably because it was ran on client");
        }

        return user.username;
    },

    removeuser: (id: string) => {
        Meteor.users.remove(id);
    },
});