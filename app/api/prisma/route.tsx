import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await prisma.userStats.deleteMany();
  return NextResponse.json("Deleted");
}
