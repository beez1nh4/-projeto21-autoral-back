import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { deleteHobbyById, getHobbiesByUserId, getHobbyById, postHobby, updateHobbyById } from "@/controllers";

const hobbiesRouter = Router();

hobbiesRouter
  .all("/*", authenticateToken)
  .get("/", getHobbiesByUserId)
  .get("/:hobbyId", getHobbyById)
  .post("/", postHobby)
  .delete("/:hobbyId", deleteHobbyById)
  .put("/:hobbyId", updateHobbyById);

export { hobbiesRouter };