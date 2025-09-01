import { withFilter } from "graphql-subscriptions";
import { NOTIFICATION_ADDED } from "../../server/pubsub.js";
export const notificationSubscriptionResolvers = {
    notificationAdded: {
        subscribe: withFilter(
            (_, variables, { pubsub }) => {
                return pubsub.asyncIterableIterator([NOTIFICATION_ADDED]);
            },
            (payload, variables) => {
                return payload.notificationAdded.userId === variables.userId;
            }
        ), 
    }, 
}