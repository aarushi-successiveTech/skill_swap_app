import swapModel from "../model/swapModel.js";
import userModel from "../model/userModel.js";
import notificationModel from "../model/notificationModel.js";
import {pubsub, NOTIFICATION_ADDED} from "../../../backend_server/src/server/pubsub.js";
import {GraphQLClient, gql} from 'graphql-request'; 

const graphQLEndpoint = "http://localhost:4000/graphql";
const graphQLClient = new GraphQLClient(graphQLEndpoint);

const NOTIFICATION_MUTATION = gql`

  mutation CreateNotification($message: String!, $userId: ID!) {
    createNotification(message: $message, userId: $userId) {
      id
      message
      userId
      createdAt
    }
  }
`;

export const createSwapService = async(fromUserId, data) => {
    try{
        const {toUser, skillOffered, skillRequested} = data; 

        const fromUser = await userModel.findById(fromUserId);
        const toUserExists = await userModel.findById(toUser); 

        if(!fromUser || !toUserExists){
            return {error: 'invalid users'}
        }
        const swap = new swapModel({
            fromUser: fromUserId, 
            toUser,
            skillOffered,
            skillRequested,
            status:'pending'
        }); 
        const savedSwap = await swap.save();

    const toUserMessage = `You received a swap request from ${fromUser.name}!`;
    const fromUserMessage = `You sent a swap request to ${toUserExists.name}!`;


    await Promise.all([
      graphQLClient.request(NOTIFICATION_MUTATION, { message: toUserMessage, userId: toUser }),
      graphQLClient.request(NOTIFICATION_MUTATION, { message: fromUserMessage, userId: fromUserId }),
    ]);

        //adding the notifications 
        const toUserNotif = new notificationModel({
            user: toUser, 
            message: `You received a swap request from ${fromUser.name}!`
        });

        const fromUserNotif = new notificationModel({
            user: fromUserId, 
            message: `you sent a swap request to ${toUserExists.name}!`,
        });

        await Promise.all([toUserNotif.save(), fromUserNotif.save()]);

        pubsub.publish(NOTIFICATION_ADDED, {
            notificationAdded: {
                user: toUser, 
                message: `you received a swap request from ${fromUser.name}`, 
                type: "swap", 
            }, 
        });

        pubsub.publish(NOTIFICATION_ADDED, {
            notificationAdded: {
                user: fromUserId, 
                message: `you sent a request to ${toUserExists.name}`, 
                type: 'swap'
            },
        });


        return savedSwap; 
    }
    catch(error){
        console.log('error creating swap request',error); 
    }
}; 

export const respondSwapService = async(swapId, status) => {
    try{
        const swap = await swapModel.findById(swapId); 

        if(!swap){
            return {error: 'swap request not found!'}
        }
        swap.status = status;
        const updatedSwap = await swap.save(); 
        return updatedSwap; 
    }
    catch(error){
        console.log('error updating the status', error)
    }
}; 

export const getSWapService = async(userId) => {

    try{
        const swaps = await swapModel.find({
        $or: [{ fromUser: userId }, { toUser: userId }]
      })
      .populate("fromUser", "name email")
      .populate("toUser", "name email");

      return swaps; 

    }
    catch(error){
        console.log('error retriving swaps', error);
    }
};