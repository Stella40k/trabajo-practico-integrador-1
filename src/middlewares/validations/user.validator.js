import { body, param } from "express-validator";
//el param es para validar el campo q venga en el req.body
import { userModel } from "../../models/user.model";

//ver mas sobre esta logica
export const createUserValidation =[
    body("username")
    .isLength({min: 3, max: 20}).withMessage("el username debe ser entre 3 y 20 caracteres")
    .isAlphanumeric().withMessage("el username solo puede tener letras y numeros")
    .custom(async(value)=>{
        const user = await userModel.findOne({where: {username: value}});
        if(user){
            throw new Error("username ya en uso")
        }
    }),
    body("email")
    .isEmail().withMessage("email invalido")
    .custom(async(value)=>{
        const user = await userModel.findOne({where: {email: value}});
        if(user){
            throw new Error("email ya registrado");
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
    .isInt().withMessage("el id debe ser un numero entero")
    .custom(async(value)=>{
        const user = await userModel.findByPk(value);
        if(!user){
            throw new Error("usuario inexistente");
        }
    }),
    body("username")
    .optional()
    .isLength({ min: 3, max: 20 }).withMessage("el username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric().withMessage("el username solo puede contener letras y numeros")
    .custom(async (value, { req }) => {
      const user = await userModel.findOne({ where: { username: value } });
      if (user && user.id !== parseInt(req.params.id)) {
        throw new Error("username en uso");
      }
    }),
    body("email")
    .optional()
    .isEmail().withMessage("email invalido")
    .custom(async(value, {req})=>{
        const user = await userModel.findOne({where:{email:value}});
        if(user && user.id !==parseInt(req.params.id)){
            throw new Error("email ya existente")
        }
    }),
];
export const deleteUserValidation = [
    param("id")
    .isInt().withMessage("el ID debe ser un numero entero")
    .custom(async(value)=>{
        const user = await userModel.findByPk(value);
        if(!user){
            throw new Error("usuario no encontrado")
        }
    })
]