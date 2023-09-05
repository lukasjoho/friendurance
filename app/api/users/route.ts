import * as uuid from "uuid";
import { client } from "@/lib/dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const Item = {
    id: { S: uuid.v4() },
    content: { S: JSON.stringify(body) },
  };
  const user = await client.send(
    new PutItemCommand({
      TableName: "users",
      Item,
    })
  );
  return NextResponse.json({ user });
}
