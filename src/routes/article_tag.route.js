import express from "express";
import{
      allARticlesTags,
      articleTagById,
      createArticleTag,
      updateArticleTag,
      deletArticleTag,
} from "../controllers/article_tag.controller.js"

export const articleTagRouter = express.Router()
articleTagRouter.get("/", allARticlesTags);
articleTagRouter.get("/:id", articleTagById);
articleTagRouter.post("/", createArticleTag);
articleTagRouter.put("/:id", updateArticleTag);
articleTagRouter.delete("/:id", deletArticleTag);