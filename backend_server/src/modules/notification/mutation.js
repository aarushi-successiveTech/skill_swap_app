import { pubsub, NOTIFICATION_ADDED } from "../../server/pubsub.js";

export const notificationMutationResolvers = {
    createNotification: async(_, {message, userId}, {pubsub}) => {
        const notification = {
            id: Date.now().toString(),
            message, 
            userId,
            createdAt: new Date().toISOString()}; 
        pubsub.publish(NOTIFICATION_ADDED, {notificationAdded: notification});
        return notification; 
    }, 
}; 