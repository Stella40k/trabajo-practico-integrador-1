import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";

export const profileModel = sequelize.define('Profile',{
    id:{},
    user_id:{},
    first_name:{},
    last_name:{},
    biography:{},
    avatar_url:{},
    birth_date:{},
},{
    timestamps:true,
    createdAt:"create_at",
    updatedAt:"update_at"
})