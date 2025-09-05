import express from "express";
import{
      allArticle,
      articleById,
      createArticle,
      updateArticle,
      deleteArticle,
} from "../controllers/article.controller.js"

export const articleRouter = express.Router()

articleRouter.get("article/", allArticle);
articleRouter.get("article/:id", articleById);
articleRouter.post("article/", createArticle);
articleRouter.put("article/:id", updateArticle);
articleRouter.delete("article/:id", deleteArticle);