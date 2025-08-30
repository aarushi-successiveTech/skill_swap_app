import { withFilter } from "graphql-subscriptions";
import { NOTIFICATION_ADDED } from "../../server/pubsub.js";
export const notificationSubscriptionResolvers = {
    notificationAdded: {
        subscribe: withFilter(
            (_, variables, { pubsub }) => {
                // The pubsub.asyncIterator call needs to return the iterator.
                // The 'variables' are available here to be used later in the filter.
                return pubsub.asyncIterableIterator([NOTIFICATION_ADDED]);
            },
            (payload, variables) => {
                // The payload contains the data published by the mutation.
                // The variables contain the arguments from the subscription.
                return payload.notificationAdded.userId === variables.userId;
            }
        ), 
    }, 
}