import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import { userModel } from "./user.model.js";

export const userProfile = sequelize.define('userProfile',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        references: { model: userModel, key:"id"},
        onDelete: "CASCADE"
    },
    first_name:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    last_name:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    biography:{
        type:DataTypes.STRING(255),
    },
    avatar_url:{
        type: DataTypes.STRING(255),
        allowNull: true
    },
    birth_date:{
        type: DataTypes.DATEONLY,
        allowNull:true
    },
},{
    timestamps:true,
    createdAt:"create_at",
    updatedAt:"update_at"
})

//RELACIONES
//un usuario solo pertenece a un perfil
userModel.hasOne(userProfile, {foreignKey: 'user_id', as: "profile"});

//un perfil solo pertenece a un usuario, se identifica con el id del user
userProfile.belongsTo(userModel, {foreignKey: 'user_id', as: "user"})
//el alias es para mostrar mejor la info, en vez de user_id se vera user cuando traiga la info





