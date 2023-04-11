import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { deleteLinkById, getLinksByUserId, getLinkById, postLink, updateLinkById } from "@/controllers";

const linksRouter = Router();

linksRouter
  .all("/*", authenticateToken)
  .get("/", getLinksByUserId)
  .get("/:linkId", getLinkById)
  .post("/", postLink)
  .delete("/:linkId", deleteLinkById)
  .put("/:linkId", updateLinkById);

export { linksRouter };