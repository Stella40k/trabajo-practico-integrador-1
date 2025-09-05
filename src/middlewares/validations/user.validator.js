import { body, param } from "express-validator";
//el param es para validar el campo q venga en el req.body
import { userModel } from "../../models/user.model";
import { error } from "console";
//ver mas sobre esta logica
export const createUserValidation =[
    body("username")
    .isLength({min: 3, max: 20}).withMessage("el username debe ser entre 3 y 20 caracteres")
    .isAlphanumeric().withMessage("el username solo puede tener letras y numeros")
    .custom(async(value)=>{
        const user = await userModel.findOne({where: {username: value}});
        if(user){
            throw new error("username ya en uso")
        }
    }),
    body("email")
    .isEmail().withMessage("email invalido")
    .custom(async(value)=>{
        const user = await userModel.findOne({where: {email: value}});
        if(user){
            throw new error("email ya registrado");
        }
    }),
    body("password")
    .isLength({min: 8}).withMessage("contraseña muy corta, debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("la contraseña debe tener al menos una mayuscula, una minuscula y un numero"),
    
    body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("rol invalido")
];
export const updateUserValidation =[
    param("id")
    .isInt(),
    body("username"),
    body("email"),
]
export const deleteUserValidation = []