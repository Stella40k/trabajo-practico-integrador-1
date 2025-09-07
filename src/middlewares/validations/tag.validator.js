import { body, param } from "express-validator";
import { tagModel } from "../../models/tag.model.js";

export const createTagValidation =[
    body("name")
    .notEmpty().withMessage("el nombre es obligatorio")
    .isLength({min:2, max:30}).withMessage("el nombre debe estar entre")
    .custom(async(value)=>{
        const tag = await tagModel.findOne({where:{name:value}});
        if(tag){
            throw new Error("etiqueta ya existente")
        }
    })
];
export const updateTagValidation=[
    param("id")
    .isInt().withMessage("solo se permiten numeros enteros")
    .custom(async(value)=>{
        const tag = await tagModel.findByPk(value);
        if(!tag){
            throw new Error("etiqueta inexistente")
        }
    }),
    body("name")
    .optional()
    .notEmpty().withMessage("el nombre es obligatorio")
    .isLength({min:2, max: 30}).withMessage("el nombre debe tener entre 2 y 30 caracteres")
   //pedirle al profe q me explique q pasa aca
    .custom(async(value, {req})=>{
        const tag = await tagModel.findOne({wher:{name:value}});
        //buscar otra forma de validar esto
        if(tag && tag.id !== parseInt(req.params.id)){
            throw new Error("nombre ya existente")
        }
    })
];
export const deleteTagValidation =[
    param("id")
    .isInt().withMessage("la id debe ser un numero entero")
    .custom(async(value)=>{
        const tag= await tagModel.findByPk(value);
        if(!tag){
            throw new Error("etiqueta ya existente")
        }
    })
];