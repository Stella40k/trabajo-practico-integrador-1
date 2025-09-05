import { userProfile } from "../models/profile.model.js";
import {userModel} from "../models/user.model.js";

export const allProfile = async (req, res) => {
    try {
        const profiles = await userProfile.findAll({
            include:[{model:userModel, as: "user"}],
        });
        return res.status(200).json(profiles)
    } catch (error) {
        return res.status(500).json({message: "error al traer todos los perfiles", error});
    }
}
export const profileById = async (req, res) => {
    try {
        const profile = await userModel.findOne({
            where:{ id: req.params.id},
            include:[{model: userModel, as: "user"}]
        });
        return res.status(200).json(profile);
    } catch (error) {
        return res.status(500).json({message: "error al buscar el perfil", error});
    }
}
export const createProfile = async (req, res)=>{
    try {
        const{first_name, last_name, biography, avatar_url, birth_date, user_id} = req.body;
        const newProfile = await userModel.create({
            first_name,
            last_name,
            biography,
            avatar_url,
            birth_date,
            user_id
        });
        return res.status(201).json({message: "perfil creado", newProfile});
    } catch (error) {
        return res.status(500).json({message: "error al crear el perfil", error});
    }
}
export const updateProfile = async(req, res) =>{
    try {
        const profileUpdate = await userModel.findByPk(req.params.id);
        const{first_name, last_name, biography, avatar_url, birth_date} = req.body;
        await profileUpdate.update({
        first_name: first_name || profile.first_name,
        last_name: last_name || profile.last_name,
        biography: biography || profile.biography,
        avatar_url: avatar_url || profile.avatar_url,
        birth_date: birth_date || profile.birth_date,
    });
    return res.status(200).json({message:"perfil actualizado", profileUpdate});
    } catch (error) {
        return res.status(500).json({message: "error al actualizar el perfil", error});
    }
}
export const deleteProfile =async(req, res)=>{
    try {
    const profileDelete = await ProfileModel.findByPk(req.params.id);
    await profileDelete.destroy();
    return res.status(200).json({message: "perfil borrado", profileDelete});
    } catch (error) {
        return res.status(500).json({message: "error al eliminar el perfil", error});
    }
}