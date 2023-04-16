import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { createUser } from "./factories";
import { createSession } from "./factories/sessions-factory";
import { prisma } from "@/config";


export async function cleanDb() {
    await prisma.weeklyActivity.deleteMany({});
    await prisma.activity.deleteMany({});
    await prisma.hobby.deleteMany({});
    await prisma.task.deleteMany({});
    await prisma.progress.deleteMany({});
    await prisma.reward.deleteMany({});
    await prisma.studySession.deleteMany({});
    await prisma.link.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
    const incomingUser = user || (await createUser());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
  
    await createSession(token);
  
    return token;
}
