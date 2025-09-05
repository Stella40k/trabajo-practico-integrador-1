import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const authMiddleware =(req, res, next)=>{
    try {
        const token = req.cookies.token;

        //verificacion de la existencia de ese token
        if(!token){
            return res.status(401).json({message: "usuario no autenticado, inicie sesion"});
        }

        //verifica y codifica el token con la firma
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        //junta la info del user a la solicitud, pedir mas explicacion igual
        req.user = decode
        next();
    } catch (error) {
        return res.status(401).json({message:"token invalido o caducado, inicie sesion nuevamente"});
    }
}