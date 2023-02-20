import {defineStore} from 'pinia';
import {ServiceChannel} from "../src/services/ServiceChannel";
import {StoreChat} from "./StoreChat.js";

export const StoreChannel = defineStore('StoreChannel', {
    state : () => ({
        channels: [],
        showCreateChannelModal: false,
        showEditChannelModal: false,
        isDeleteMode: false,
        soonDeleteChannel: []
    }),
    actions : {
        async setupAll() {
            const response = await ServiceChannel.getAll();
            this.channels = await response.json();

            for(let channel of this.channels) {
                channel.offset = 0;
                channel.messages = [];
                channel.unread = false;

                if(!channel.ws) {
                    channel.ws = new WebSocket(`wss://edu.tardigrade.land/msg/ws/channel/${channel.id}/token/${localStorage.getItem("token")}`);

                    channel.ws.onmessage = function(event) {
                        const message = JSON.parse(event.data);
                        if(message.author !== localStorage.getItem("username")) {
                            StoreChannel().addMessageToChannel(message);
                            const audio = new Audio("/src/assets/notification.mp3");
                            audio.play();
                        }
                    }

                    channel.ws.onopen = function(event) {
                        console.log(`Successfully connected to the ws for channel: ${channel.id}`)
                    }

                    channel.ws.onclose = function(event) {
                        console.log(`Successfuly disconnected to the ws for channel: ${channel.id}`)
                    }
                }
            }
        },

        changeCreateChannelModal() {
            this.closeEditModal();
            this.showCreateChannelModal = !this.showCreateChannelModal;
        },

        changeEditChannelModal() {
            this.closeCreateModal();
            this.showEditChannelModal = !this.showEditChannelModal;
        },

        async changeStateDeleteMode() {
            this.isDeleteMode = !this.isDeleteMode;

            if(this.isDeleteMode === false) {
                for(let channel of this.soonDeleteChannel) {
                    const response = await ServiceChannel.delete(channel.id);
                    if(response.ok) {
                        this.channels.splice(this.getIndexFromArrayById(this.channels, channel.id), 1);
                    }
                }
            }
        },

        closeCreateModal() {
            this.showCreateChannelModal = false;
        },

        closeEditModal() {
            this.showEditChannelModal = false;
        },

        async creeChannel(channel) {
            const response = await ServiceChannel.create(channel);
            if(response.ok) {
                channel.id = await response.text();
                channel.creator = localStorage.getItem("username");
                channel.theme = null;
                channel.users = [localStorage.getItem("username")]

                this.channels.push(channel);

                this.closeCreateModal();
            }
        },

        async editChannel(editedChannel, channel) {
            let response = await ServiceChannel.edit(editedChannel, channel.id);
            if(response.ok) {
                let finalChannel = {...channel, ...editedChannel};

                let index = this.getIndexFromArrayById(this.channels, finalChannel.id);
                this.channels.splice(index, 1, finalChannel);

                this.closeEditModal();
            }
        },

        getIndexFromArrayById: function(array, id) {
            let index = 0;
            for(let c of array) {
                if(c.id === id) {
                    break;
                }

                index += 1;
            }

            return index;
        },

        removeFromSoonDeletedChannel(channel) {
            this.soonDeleteChannel.splice(this.getIndexFromArrayById(this.soonDeleteChannel, channel.id), 1);
        },

        addToSoonDeletedChannel(channel) {
            if(channel.creator === localStorage.getItem("username")) {
                this.soonDeleteChannel.push(channel);
            }
        },

        addUser(channel, username) {
            return new Promise(async (resolve, reject) => {
                const response = await ServiceChannel.addUser(channel, username);
                if(response.ok) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        },

        removeUser(channel, username) {
            return new Promise(async (resolve, reject) => {
                const response = await ServiceChannel.removeUser(channel, username);
                if(response.ok) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        },

        addMessageToChannel(message) {
            const index = this.getIndexFromArrayById(this.channels, message.channel_id);
            this.channels[index].messages.push(message);
            if(StoreChat().selectedChannel == null || message.channel_id !== StoreChat().selectedChannel.id) {
                this.channels[index].unread = true;
            }
        }
    },
    getters : {},
});
