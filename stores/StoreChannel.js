import {defineStore} from 'pinia';
import {ServiceChannel} from "../src/services/ServiceChannel";

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
        }
    },
    getters : {},
});
