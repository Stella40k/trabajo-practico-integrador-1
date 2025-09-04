import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import { userModel } from "./user.model.js";

export const articleModel = sequelize.define('Article',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true        
    },
    title:{
        type:DataTypes.STRING(200),
        validate:{
            len:[3, 200]
        }
    },
    content:{
        type: DataTypes.STRING(50),
        validate:{
            len:[5, 50]
        },
        allowNull: true
    },
    excerpt:{
        type:DataTypes.STRING(500),
        allowNull: true
    },
    status:{
        type: DataTypes.ENUM('published', 'archived'),
        defaultValue: 'published'
    },
},{
    timestamps:true,
    createdAt:"create_at",
    updatedAt:"update_at"
})

//RELACIONES
//un user tiene muchos articulos
userModel.hasMany(articleModel, {foreignKey: 'user_id', as: "article"});

//un articulo pertenece a un user
articleModel.belongsTo(userModel, {foreignKey:'user_id', as: "author"});