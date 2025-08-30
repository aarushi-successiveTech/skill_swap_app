import { notificationMutationResolvers } from "./mutation.js";
import { notificationQueryResolvers } from "./query.js";

export const notificationModule = {
    Query: notificationQueryResolvers, 
    Mutation: notificationMutationResolvers
}