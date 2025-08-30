import chatModel from "../model/chatModel.js";
import swapModel from "../model/swapModel.js";
import {GraphQLClient, gql} from 'graphql-request'; 
import {pubsub, MESSAGE_RECEIVED} from '../../../backend_server/src/server/pubsub.js'; 

const graphQLEndpoint = "http://localhost:4000/graphql";
const graphQLClient = new GraphQLClient(graphQLEndpoint);

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($fromUser: ID!, $toUser: ID!, $message: String!) {
    sendMessage(fromUser: $fromUser, toUser: $toUser, message: $message) {
      id
      fromUser
      toUser
      message
      createdAt
      read
    }
  }
`;

export const sendChatService = async (fromUserId, { toUser, message }) => {
  const allowed = await swapModel.exists({
    status: "accepted",
    $or: [
      { fromUser: fromUserId, toUser },
      { fromUser: toUser, toUser: fromUserId },
    ],
  });
  if (!allowed) {
    return { error: "Users are not connected (swap not accepted)." };
  }

  const saved = await chatModel.create({
    fromUser: fromUserId,
    toUser,
    message,
  });

  const payload = {
    id: saved._id.toString(),
    fromUser: fromUserId,
    toUser,
    message,
    createdAt: saved.createdAt.toISOString(),
    read: saved.read,
  };

  pubsub.publish(MESSAGE_RECEIVED, { messageReceived: payload });

  await graphQLClient.request(SEND_MESSAGE_MUTATION, {
    fromUser: fromUserId,
    toUser,
    message,
  });

  return saved;
};