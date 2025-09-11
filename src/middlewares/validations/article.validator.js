import { body, param } from "express-validator";
import { articleModel } from "../../models/article.model.js";

export const createArticleValidation =[
    body("title")
    .notEmpty().withMessage("completar los campos obligatorios")
    .isLength({min: 3, max:200}).withMessage("el titulo debe tener entre 3 y 200 caracteres"),
    body("content")
    .notEmpty().withMessage("completar los campos obligatorios")
    .isLength({min:5, max:50}).withMessage("el contenido debe ser entre 5 y 50 caracteres"),
    body("excerpt")
    .optional()
    .isLength({max:500}).withMessage("solo se puden agrefar 500 caracteres"),
    body("status")
    .optional()
    .isIn(['published', 'archived']).withMessage("el estado debe ser valido"),
];
export const updateArticleValidation=[
    param("id")
    .notEmpty().withMessage("el id es obligatorio")
    .custom(async(value)=>{
        const article=await articleModel.findByPk(value);
        if(!article){
            throw new Error("id inexistente");
        }
    }),
    body("title")
    .optional()
    .isLength({min:3, max:200}).withMessage("el titulo debe tener entre 3 y 200 caracteres"),
    body("content")
    .optional()
    .isLength({min:5, max:50}).withMessage("el contenido puede ser entre 5 y 50 caracteres"),
    body("excerpt")
    .optional()
    .isLength({max:500}).withMessage("solo se puede agregar hasta 500 caracteres"),
    body("status")
    .optional()
    .isIn(['published', 'archived']).withMessage("el edtado debe ser uno valido")
];
export const deletArticleValidation=[
    param("id")
    .isInt().withMessage("el id debe ser un numero entero")
    .custom(async(value)=>{
        const article= await articleModel.findByPk(value);
        if(!article){
            throw new Error("id inexistente");
        }
    })
];