import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";

export const tagModel = sequelize.define("Tag",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(30),
        unique: true,
        validate:{
            len: [2, 30]
        }
    },

},{
    timestamps:true,
    createdAt:"create_at",
    updatedAt:"update_at"
});