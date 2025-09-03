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
    timestamps: true
})

