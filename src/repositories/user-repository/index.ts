import { prisma } from "@/config";
import { Prisma, User } from "@prisma/client";

async function findUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    }
  });
}

async function createUser(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function updateUser(id: number, data: UpdateUserParams) {
  return prisma.user.update({
    where: {
      id
    },
    data
  })
}

export type UpdateUserParams = Omit<User, "id" | "createdAt" | "updatedAt">;


const userRepository = {
  findUserByEmail,
  createUser,
  updateUser
};

export default userRepository;
