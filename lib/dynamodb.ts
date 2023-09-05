import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
