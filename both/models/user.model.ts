/**
 * Created by Puma on 02-Jan-17.
 */
export interface User extends Meteor.User {
    first_name?: string;
    last_name?: string;
    color?: string;
    bg_color?: string;
    positions?: [string];
}
