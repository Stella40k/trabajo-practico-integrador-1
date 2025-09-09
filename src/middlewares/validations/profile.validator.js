import { body } from "express-validator";
export const updateProfileValidation =[
    body("firts_name")
    .optional()
    .isLength({min: 2, max: 50}).withMessage("solo puede tener entre 2 y 50 caracteres"),
    body("last_name")
    .optional()
    .isLength({min: 2, max: 50}).withMessage("solo puede poner entre 2 y 50 caracteres"),
    body("biography")
    .optional()
    .isLength({max:500}).withMessage("la biografia no puede tener mas de 500 caracteres"),
    body("avatar_url")
    .optional()
    .isURL().withMessage("URL invalida"),
]