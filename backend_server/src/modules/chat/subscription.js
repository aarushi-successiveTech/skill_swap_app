import { MESSAGE_RECEIVED } from "../../server/pubsub.js";
import { withFilter } from "graphql-subscriptions";

export const chatSubscriptionResolvers = {
    messageReceived: {
        subscribe: withFilter(
            (_, __, {pubsub}) => pubsub.asyncIterableIterator([MESSAGE_RECEIVED]),
            (payload, variables) => {
                const message = payload.messageReceived; 
                return message.toUser === variables.userId || message.fromUser === variables.userId; 
            }
        )
    }
}