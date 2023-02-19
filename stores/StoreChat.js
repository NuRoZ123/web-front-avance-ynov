import {defineStore} from 'pinia';
import {ServiceMessages} from "../src/services/ServiceMessages";
import {StoreChannel} from "./StoreChannel.js";

export const StoreChat = defineStore('StoreChat', {
    state : () => ({
        selectedChannel: null,
    }),
    actions : {
        setSelectedChannel(channel) {
            this.selectedChannel = channel;
            channel.unread = false;
            this.addMessageToSelectedChannel();
        },

        async addMessageToSelectedChannel() {
            const response = await ServiceMessages.getMessage(this.selectedChannel);
            if(response.ok) {
                this.selectedChannel.offset += 40;
                const messages = await response.json();
                let newMessages = [];
                for(const message of messages) {
                    newMessages.push(message);
                }

                this.selectedChannel.messages = [...newMessages, ...this.selectedChannel.messages];
            }
        },

        sendMessage(message, channel) {
            return new Promise(async (resolve, reject) => {
                const obj = ServiceMessages.create(message, channel);
                const response = await obj.api;
                const isUrl = obj.isUrl;
                if(response.ok) {
                    const longDate = Date.now().valueOf();
                    const author = localStorage.getItem("username");

                    const finaleMessage = {channel_id: channel.id, timestamp: longDate, author: author, content: {
                            Text: isUrl ? "" : message,
                            Image: isUrl ? message : "",
                        }};

                    this.selectedChannel.messages.push(finaleMessage);
                    resolve(true)
                } else {
                    reject(false);
                }
            })
        },

        addUser(username) {
            this.selectedChannel.users.push(username)
        },

        removeUser(username) {
            let index = 0;
            for(let u of this.selectedChannel.users) {
                if(u === username) {
                    break;
                }

                index += 1;
            }

            this.selectedChannel.users.splice(index, 1);
        }
    },
    getters : {},
});
