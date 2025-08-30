import { MESSAGE_RECEIVED } from "../../server/pubsub.js";

export const chatMutationResolvers = {
    sendMessage: async(_, {fromUser, toUser, message}, {pubsub}) => {
        const payload = {
            id: Date.now().toString(), 
            fromUser, 
            toUser, 
            message, 
            createdAt: new Date().toISOString(), 
            read: false,
        }; 

        pubsub.publish(MESSAGE_RECEIVED, {messageReceived: payload}); 
        return payload; 
    }, 
}; 