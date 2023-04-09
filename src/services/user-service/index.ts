import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "@/errors";

export async function createUser({ email, password, username, birthday, photoUrl }: CreateUserParams): Promise<User> {

  await validateUniqueEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.createUser({
    email,
    password: hashedPassword,
    username,
    birthday,
    photoUrl
  });
}

async function validateUniqueEmail(email: string) {
  const userWithSameEmail = await userRepository.findUserByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}


export type CreateUserParams = Omit<User, "id" | "createdAt" | "updatedAt">;

const userService = {
  createUser,
};

export default userService;