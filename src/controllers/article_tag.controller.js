import { articleTag } from "../models/article_tag.model.js";
import { tagModel } from "../models/tag.model.js";
import { articleModel } from "../models/article.model.js";

export const allARticlesTags = async (req, res)=>{
    try {
        const articlesTasg = await articleTag.findAll();
        return res.status(200).json(articlesTasg);
    } catch (error) {
        return res.status(500).json({message:"error en el sistema", error})
    }
}
export const articleTagById = async(req, res)=>{
    try {
        const articleTag = await articleTag.findByPk(req.params.id);
        return res.status(200).json(articleTag);
    } catch (error) {
        return res.status(500).json({message:"error en el sistema", error})
    }
}
export const createArticleTag = async(req, res)=>{
    try {
        const { article_id, tag_id } = req.body;
        const newArticleTag = await articleTag.create({article_id, tag_id});
        return res.status(201).json({message: "creado correctamente", newArticleTag});
    } catch (error) {
        return res.status(500).json({message:"error en la creacion", error})
    }
}
export const updateArticleTag = async(req, res)=>{
    try {
        const articleTagUpdate = await articleTag.findOne({where: { id: req.params.id }});
        const { article_id, tag_id } = req.body;
        await articleTagUpdate.update({
        article_id: article_id || articleTag.article_id,
        tag_id: tag_id || articleTag.tag_id,
        });
        return res.status(200).json(articleTag);
    } catch (error) {
        return res.status(500).json({message:"error en la actualizacion", error})
    }
}
export const deletArticleTag = async(req, res)=>{
    try {
        const articleTagDelete = await articleTag.findByPk(req.params.id);
        await articleTagDelete.destroy();
        return res.status(200).json({message:"relacion eliminada correctamente",articleTagDelete});
    } catch (error) {
        return res.status(500).json({message:"error en la eliminacion", error})
    }
}