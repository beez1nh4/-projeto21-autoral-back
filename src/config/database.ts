import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export const redis = createClient({
  url: process.env.REDIS_URL
});

export async function connectCache() {
  await redis.connect();
}

export async function disconnectCache() {
  await redis.disconnect();
}