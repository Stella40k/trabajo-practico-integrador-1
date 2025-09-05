import express from "express";
import{
      allTags,
      tagById,
      createTag,
      updateTag,
      deleteTag
} from "../controllers/tag.controller.js";

export const tagRouter = express.Router();
tagRouter.get("tag/", allTags);
tagRouter.get("tag:id", tagById);
tagRouter.post("tag/", createTag);
tagRouter.put("tag/:id", updateTag);
tagRouter.delete("tag/:id", deleteTag);