import {defineStore} from 'pinia';
import {ServiceMessages} from "../src/services/ServiceMessages";

export const StoreChat = defineStore('StoreChat', {
    state : () => ({
        selectedChannel: null
    }),
    actions : {
        setSelectedChannel(channel) {
            this.selectedChannel = channel;
            if(!channel.offset) {
                channel.offset = 0;
                channel.messages = [];
                this.addMessageToSelectedChannel();
            }
        },

        async addMessageToSelectedChannel() {
            const response = await ServiceMessages.getMessage(this.selectedChannel);
            if(response.ok) {
                const messages = await response.json();
                for(const message of messages) {
                    this.selectedChannel.messages.push(message);
                }
            }
        },

        sendMessage(message, channel) {
            return new Promise(async (resolve, reject) => {
                const response = await ServiceMessages.create(message, channel);
                if(response.ok) {
                    const longDate = Date.now().valueOf();
                    const author = localStorage.getItem("username");

                    const finaleMessage = {channel_id: channel.id, timestamp: longDate, author: author, content: {
                            Text: message,
                            Image: "",
                        }};

                    this.selectedChannel.messages.push(finaleMessage);
                    resolve(true)
                } else {
                    reject(false);
                }
            })
        },

        addUser(username) {
            this.selectedChannel.users.push(username.value)
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
