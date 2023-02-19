import {ServiceXhr} from "./ServiceXhr";

export const ServiceUser = {
    login: (username, password) => {
        const data = JSON.stringify({username: username, password: password});
        return ServiceXhr.callWithoutAuth(`https://edu.tardigrade.land/msg/login`, data, "POST");
    },
}