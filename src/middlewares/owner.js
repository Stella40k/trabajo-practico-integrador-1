import { error } from "console";
import { articleModel } from "../models/article.model.js";

export const ownerMiddleware = async(req, res, next)=>{
    try {
        const article = await articleModel.findByPk(req.params.id);
        if(!article){
            return res.status(404).json({message:"articulo no encontrado"})
        }
        if(article.user_id !==req.user.id && req.user.role!=="admin"){
            return res.status(403).json({message: "no sos propietario de este articulo"});
        }
        next();//preguntar pq esta aca y no afuera
    } catch (error) {
        return res.status(500).json({message: "error en el servidor", error})
    }
}