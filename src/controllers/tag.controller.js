import { tagModel } from "../models/tag.model.js";

export const allTags = async (req, res) => {
    try {
        const tags = await tagModel.findOne({ where: { id: req.params.id } });
        return res.status(200).json(tags); 
    } catch (error) {
        return res.status(500).json({message: "error al buscar las etiquetas", error}) 
    }
}
export const tagById = async (req, res) => {
    try {
    const tag = await tagModel.findOne({ where: { id: req.params.id } });
    return res.status(200).json(tag);        
    } catch (error) {
        return res.status(500).json({message: "error al buscar la etiqueta", error})         
    }
}
export const createTag = async (req, res)=>{
    try {
    const { name, article_id } = req.body;
    const newTag = await tagModel.create({name,article_id,});
    return res.status(201).json(newTag);        
    } catch (error) {
        return res.status(500).json({message: "no se pudo crear la etiqueta", error})                 
    }
}
export const updateTag = async(req, res) =>{
    try {
    const tagUpdate = await tagModel.findByPk(req.params.id);
    const { name } = req.body;
    await tag.update({name: name || tag.name,});
    return res.status(200).json(tagUpdate);        
    } catch (error) {
        return res.status(500).json({message: "no se pudo actyualizar la etiqueta", error})                 
    }
}
export const deleteTag =async(req, res)=>{
    try {
    const deleteTag = await tagModel.findByPk(req.params.id);
    await deleteTag.destroy();
    return res.status(200).json("se elimino la etiqueta", deleteTag);        
    } catch (error) {
        return res.status(500).json({message: "no se pudo eliminar la etiqueta", error})                 
        
    }
}