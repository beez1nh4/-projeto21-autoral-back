import { CreateUserParams } from "@/services";
import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
  birthday: Joi.string().isoDate().required(),
  photoUrl: Joi.string().required()
});
