import {body, param} from "express-validator";
import { articleModel } from "../../models/article.model.js";
import { tagModel } from "../../models/tag.model.js";
import { articleTag } from "../../models/article_tag.model.js";

export const articleTagValidator=[
    body("articleId")
    .isInt().withMessage("el id del articulo debe ser un numero entero")
    .custom(async(value)=>{
        const article=await articleModel.findByPk(value);
        if(!article){
            throw new Error("articulo inexistente");
        }
    }),
    body("tagId")
    .isInt().withMessage("el id del tag debe ser un numero entero")
    .custom(async(value)=>{
        const tag = await tagModel.findByPk(value)
        if(!tag){
            throw new Error("tagn inexistente")
        }
    }),
];
export const deletArticleTagValidator=[
    body("id")
    .isInt().withMessage("el id debe ser un numero entero")
    .custom(async(value)=>{
        const relation=await articleModel.findByPk(value);
        if(!relation) {
            throw new Error("relacion inexistente")
        }
    })
];