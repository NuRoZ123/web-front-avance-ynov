import {ServiceXhr} from "./ServiceXhr";

export const ServiceChannel = {
    getAll: () => {
        return ServiceXhr.callWithAuthNoBody("https://edu.tardigrade.land/msg/protected/user/channels", "GET");
    },
    create: (channel) => {
        const data = JSON.stringify(channel);
        return ServiceXhr.callWithAuth("https://edu.tardigrade.land/msg/protected/channel", data,"PUT");
    },
    edit: (channel, id) => {
        const data = JSON.stringify(channel);
        return ServiceXhr.callWithAuth(`https://edu.tardigrade.land/msg/protected/channel/${id}/update_metadata`,
            data, "POST");
    },
    delete: (channelId) => {
        return ServiceXhr.callWithAuthNoBody(`https://edu.tardigrade.land/msg/protected/channel/${channelId}`, "DELETE");
    },

    addUser: (channel, username) => {
        return ServiceXhr.callWithAuthNoBody(`https://edu.tardigrade.land/msg/protected/channel/${channel.id}/user/${username}`, "PUT");
    },

    removeUser: (channel, username) => {
        return ServiceXhr.callWithAuthNoBody(`https://edu.tardigrade.land/msg/protected/channel/${channel.id}/user/${username}`, "DELETE");
    }
}