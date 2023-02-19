import {ServiceXhr} from "./ServiceXhr";

export const ServiceMessages = {
    getMessage: (channel) => {
        return ServiceXhr.callWithAuthNoBody(`https://edu.tardigrade.land/msg/protected/channel/${channel.id}/messages/${channel.offset}`, "GET");
    },

    create: (message, channel) => {
        let isUrl;
        try {
            const url = new URL(message);
            isUrl = true;
        } catch (_) {isUrl = false;}
        let data;

        if(isUrl) {
            data = JSON.stringify({Image: message});
        } else {
            data = JSON.stringify({Text: message});
        }

        return {api: ServiceXhr.callWithAuth(`https://edu.tardigrade.land/msg/protected/channel/${channel.id}/message`, data, "POST"), isUrl: isUrl};
    }
}