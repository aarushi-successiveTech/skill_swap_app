import { notificationModule } from "../modules/notification/index.js";
import { notificationSubscriptionResolvers } from "../modules/notification/subscription.js";
import { chatModule } from "../modules/chat/index.js";
import { chatSubscriptionResolvers } from "../modules/chat/subscription.js";

export const resolvers = {
    Query : {
        ...notificationModule.Query
    },

    Mutation: {
        ...notificationModule.Mutation,
        ...chatModule.Mutation
    }, 

    Subscription: {
        ...notificationSubscriptionResolvers, 
        ...chatSubscriptionResolvers
    }
}