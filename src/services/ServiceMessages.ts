import {ServiceXhr} from "./ServiceXhr";

export const ServiceMessages = {
    getMessage: (channel) => {
        return ServiceXhr.callWithAuthNoBody(`https://edu.tardigrade.land/msg/protected/channel/${channel.id}/messages/${channel.offset}`, "GET");
    },

    create: (message, channel) => {
        const data = JSON.stringify({Text: message});
        return ServiceXhr.callWithAuth(`https://edu.tardigrade.land/msg/protected/channel/${channel.id}/message`, data, "POST");
    }
}