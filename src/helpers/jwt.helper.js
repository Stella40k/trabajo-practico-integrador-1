import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const generateToken =(user)=>{
    try {
        //"token" tiene toda la info del user
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"30min"
            }
        );
        return token;
    } catch (error) {
        console.error("error al generar el token", error)
        throw new Error("no se pudo generar el token");
    }
};
export const verifyToken = (token)=>{
    try {
        //aca verifico y decodifico el token con la info
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("error al verificar el token");
        throw new Error("token invalido o fuera de tiempo")
    }
};