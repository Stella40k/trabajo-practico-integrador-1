import { articleModel } from "../models/article.model.js";
import { tagModel } from "../models/tag.model.js";
import { userModel } from "../models/user.model.js";
import { articleTag } from "../models/article_tag.model.js";

export const allArticle = async (req, res) => {
    try {
    const articles = await articleModel.findAll({
      include: [
        {
          model: userModel,
          as: "author",
        },
      ],
      include: [
        {
          model: tagModel,
          as: "tags",
        },
      ],
    });
    return res.status(200).json(articles);
    } catch (error) {
        return res.status(500).json({message: "error al buscar los articulos", error})
    }
}
export const articleById = async (req, res) => {
    try {
        const article = articleModel.findByPk(req.params.id);
        return res.status(200).json(article);
    } catch (error) {
        return res.status(500).json({message: "error al buscar el articulo", error})
    }
}
export const createArticle = async (req, res)=>{
    try {
    const { title, content, excerpt, status, user_id } = req.body;
    const newArticle = await articleModel.create({
      title,
      content,
      excerpt,
      status,
      user_id,
    });
    return res.status(201).json({message: "articulo creado", newArticle});
    } catch (error) {
        return res.status(500).json({message: "error al crear el articulo", error})
    }
}
export const updateArticle = async(req, res) =>{
    try {
    const articleUpdate = await articleModel.findByPk(req.params.id); 
    const { title, content, excerpt, status } = req.body;
    await articleUpdate.update({
      title: title || article.title,
      content: content || article.content,
      excerpt: excerpt || article.excerpt,
      status: status || article.status,
    });
    return res.status(200).json({message: "articulo actualizado correctamente", articleUpdate})
} catch (error) {
        return res.status(500).json({message: "error al actualizar el articulo", error})
    }
}
export const deleteArticle =async(req, res)=>{
    try {
     const articleDelet = await articleModel.findByPk(req.params.id);
    await articleDelet.destroy();
    await articleTag.destroy({
      where: { article_id: article.id },
    });
    return res.status(200).json("articulo eliminado", articleDelet);   
    } catch (error) {
        return res.status(500).json({message: "error al eliminar el articulo", error})
    }
}