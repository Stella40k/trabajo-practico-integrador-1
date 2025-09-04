import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import { userProfile } from "./profile.model.js";

export const userModel = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate:{
            len: [3, 20]//pedir mas explicacion al profe
        }
    }, 
    email:{
        type: DataTypes.STRING(100),
        unique: true,
        validate:{
            isEmail: true
        },

    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },

},{
    timestamps: true, //agregp los creates y upadetes
    createdAt: "created_ad",
    updatedAt: "update_at",
    deletedAt: "delete_at",
    paranoid: true, //activo la eliminacion logica 
})


