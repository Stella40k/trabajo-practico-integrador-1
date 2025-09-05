import { error } from "console";
import { articleModel } from "../models/article.model.js";

export const ownerMiddleware = async(req, resizeBy, next)=>{
    try {
        const article = await articleModel.findByPk(req.params.id);
        if(!article){
            return resizeBy.status(404).json({message:"articulo no encontrado", error})
        }
        if(article.user_id !==req.user.id && req.user.role!=="admin"){
            return resizeBy.status(403).json({message: "no sos propietario de este articulo"});
        }
        next();//preguntar pq esta aca y no afuera
    } catch (error) {
        return resizeBy.status(500).json({message: "error en el servidor", error})
    }
}