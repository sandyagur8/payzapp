import { getRedisClient } from "./lib/redis.js";
import { run, HandlerContext } from "@xmtp/message-kit";
import { broadcastMessage } from "./lib/broadcast.js";
import {
  RedisClientType,
  RedisModules,
  RedisFunctions,
  RedisScripts,
} from "@redis/client";
import { supabase } from "./lib/supabase.js";


// Admin wallet address
const ADMIN_ADDRESS = "0xdF79A13d5d6CCcA1D1a0e67Ecf1d1fB17658e80A"; // Replace with actual admin address
const MERCHNAT_ADDRESS="0x67806841457F2402a103b7A5150589D4dBb8E329"
// Tracks conversation steps
const inMemoryCacheStep = new Map<string, number>();

// List of words to stop or unsubscribe
const stopWords = ["stop", "unsubscribe", "cancel", "list"];

const redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts> =
  await getRedisClient();

let clientInitialized = false;


const getBroadcastMessage=async():Promise<string|null>=>{
  const { data,error } = await supabase.from("merchantData").select("broadcast_message").eq("wallet_address",MERCHNAT_ADDRESS)
  if (error){
    return null
  }

  if(data.length==0 && !data[0].broadcast_message){
    return null
  }

  return String(data[0].broadcast_message)

}
run(async (context: HandlerContext) => {
  const {
    v2client,
    message: {
      content: { content: text },
      typeId,
      sender,
    },
  } = context;

  if (!clientInitialized) {
    clientInitialized = true;
  }

  if (typeId !== "text") {
    // If the input is not text do nothing
    return;
  }

  const lowerContent = text?.toLowerCase();

  if (sender.address.toLowerCase() === ADMIN_ADDRESS.toLowerCase() && lowerContent=="broadcast") {

    const broadcastMessageConente=await getBroadcastMessage()
    if(!broadcastMessageConente)
      return
    await broadcastMessage(redisClient, v2client, broadcastMessageConente);
    await context.reply("Broadcast message sent successfully.");
    return;
  }

  // Handle subscribe/unsubscribe
  if (lowerContent === "subscribe") {
    await redisClient.set(sender.address, "subscribed");
    await context.reply("You are now subscribed. You will receive updates.");
    return;
  }

  if (stopWords.some((word) => lowerContent.includes(word))) {
    await redisClient.del(sender.address);
    await context.reply("You are now unsubscribed. You will no longer receive updates.");
    return;
  }

  // Regular conversation flow
  const cacheStep = inMemoryCacheStep.get(sender.address) || 0;
  let message = "";

  if (cacheStep === 0) {
    message = "Welcome! Choose an option:\n1. Info\n2. Subscribe";
    inMemoryCacheStep.set(sender.address, cacheStep + 1);
  } else if (cacheStep === 1) {
    if (text === "1") {
      message = "Here is the info.";
    } else if (text === "2") {
      await redisClient.set(sender.address, "subscribed");
      message = "You are now subscribed. You will receive updates.\n\nType 'stop' to unsubscribe";
      inMemoryCacheStep.set(sender.address, 0);
    } else {
      message = "Invalid option. Please choose 1 for Info or 2 to Subscribe.";
    }
  } else {
    message = "Invalid option. Please start again.";
    inMemoryCacheStep.set(sender.address, 0);
  }

  // Send the message
  await context.reply(message);
});
