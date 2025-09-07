import { validationResult } from "express-validator";
import {comparePassword, hashPassword}from "../helpers/bcrypt.helper.js";
import {generateToken}from "../helpers/jwt.helper.js";
import { userModel } from "../models/user.model.js";
import { userProfile }from "../models/profile.model.js"
import dotenv from "dotenv";
import { profile } from "console";
import { use } from "react";

dotenv.config();

//el registro de usuario q sin eso no pueden acceder a todo lo otro
export const register = async(req, res)=>{
    const{ username, email, password, role, first_name, last_name, avatar_url, birth_date} =req.body
    try {
        const hasedPassword = await userModel.create(password);
        const user = await userModel.create({
            username: username,
            email: email,
            password: password,
            role: role
        });
        await userProfile.create({
            user_id: user.id,
            first_name: first_name,
            last_name: last_name,
            biography: biography,
            avatar_url: avatar_url,
            birth_date: birth_date
        });
        return res.status(201),json({message: "usuario registrado", userId: user.id});
    } catch (error) {
        return res.status(500).json({message: "error del servidor"})
    }
}
//el login es para el usuario, se pueden hacer cuando tener creada ya una cuenta
//y apareces en la bd por eso solo se piden esas dos cosas, no podes iniciar sesion sin estar registrado
export const login = async(req, res) =>{
    const {email, password}=req.body
    try {
        const user = await userProfile.findOne({
            where:{ email: email},
            as: "profile"
        });
        if(!user){
            return res.status(404).json({message:"credenciales incorrectas"});
        }
        const passwordMatch = await comparePassword(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({message:"credenciales incorrectas"});
        }
        const token = generateToken(user);
        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });
        return res.status(200).json({message: "incio de sesion, bienvenido"});
    } catch (error) {
        return res.status(500).json({message:"error del servidor"});
    };
};
export const logOut =(req, res)=>{
    res.clearCookie("token");
    return res.status(200).json({message: "sesion cerrada con exito"});
}
export const updateProfile =async(req, res)=>{
    try {
        const user = await userModel.findByPk(req.user.id,{
            include:{
                model: userProfile,
                as: "profile"
            }
        });
        if(!user){
            return res.status(404).json({message:"perfil no encontrado"})
        }
        await user.profile.update(req.body);
        return res.status(200).json({message:"perfil actualizado", updateProfile})
    } catch (error) {
        return res.status(500).json({message: "actualizacion falllida"})
    }
};
//pedir un poco mas de explicacion de esto