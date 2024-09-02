import cron from "node-cron";
import { Client } from "@xmtp/xmtp-js";
import {
  RedisClientType,
  RedisModules,
  RedisFunctions,
  RedisScripts,
} from "@redis/client";

export async function broadcastMessage(
  redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>,
  v2client: Client,
  message: string
) {
  console.log("Starting broadcast message");

  try {
    const addresses = await redisClient.keys("*");
    console.log(`Found ${addresses.length} potential recipients.`);

    const conversations = await v2client.conversations.list();

    let successCount = 0;
    let failCount = 0;

    for (const address of addresses) {
      const subscriptionStatus = await redisClient.get(address);
      if (subscriptionStatus === "subscribed") {
        console.log(`Sending message to ${address}`);
        
        const targetConversation = conversations.find(
          (conv) => conv.peerAddress === address
        );

        if (targetConversation) {
          try {
            await targetConversation.send(message);
            successCount++;
            console.log(`Message sent successfully to ${address}`);
          } catch (error) {
            failCount++;
            console.error(`Failed to send message to ${address}:`, error);
          }
        } else {
          failCount++;
          console.log(`No conversation found for ${address}. Message not sent.`);
        }
      } else {
        console.log(`${address} is not subscribed. Skipping.`);
      }
    }

    console.log(`Broadcast complete. Successes: ${successCount}, Failures: ${failCount}`);
    return { successCount, failCount };

  } catch (error) {
    console.error("Error during broadcast:", error);
    return { successCount: 0, failCount: 0, error: error };
  }
}
