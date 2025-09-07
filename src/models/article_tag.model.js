import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import { articleModel } from "./article.model.js";
import { tagModel } from "./tag.model.js";

export const articleTag = sequelize.define('articleTag', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        unique:true
    },
},{
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at"
})

//RELACIONES

//tag esta en muchos articulos
//through era para crear la tabla intermedia mediante seque
tagModel.belongsToMany(articleModel, {through: articleTag, foreignKey: 'tag_id', as: 'article'});

//un articulo tiene muchas tags
articleModel.belongsToMany(tagModel, {through: articleTag, foreignKey: 'article_id', as: 'tags'});

//articleTag(tabla intermedia), pertenece a article y a tags
articleTag.belongsTo(tagModel,{foreignKey: 'tag_id', as:"tag"});
articleTag.belongsTo(articleModel, {foreignKey: 'article_id', as: "article"});