import {Main} from "./imports/server-main/main";
import "../both/methods/create-user";

const mainInstance = new Main();
mainInstance.start();

Accounts.validateLoginAttempt((attemptInfo) => {
    if (attemptInfo.type === "resume") return true;

    return attemptInfo.methodName !== "createUser";
});