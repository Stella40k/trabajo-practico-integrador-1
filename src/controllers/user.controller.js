import { userModel } from "../models/user.model.js";

export const allUser = async (req, res) =>{
    try {
        const users = await userModel.findAll();
        return res.status(200).js(users);
    } catch (error) {
        return res.status(500).json({message: "error al buscar usuarios", error})
    }
}
export const userById = async(req, res) =>{
    try {
        const user = await userModel.findOne({where: {id: req.params.id}});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "error al buscar el usuario", error})   
    }
}
export const createUser = async(req, res) =>{
    try {
        const { username, email, password, role } = req.body
        const userCreate = await userModel.create({
            username,
            email,
            password,
            role
        });
        return res.status(201).json(userCreate);
    } catch (error) {
        return res.status(500).json({message: "error al crear el usuario", error})   
    }
}
export const updateUser = async (req, res) => {
  try {
    const newUser = await userModel.findOne({where: { id: req.params.id, Deleted: false },
    });
    const { username, email, password, role } = req.body;
    await user.update({
      username: username || user.username,
      email: email || user.email,
      password: password || user.password,
      role: role || user.role,
    });
        return res.status(200).json(newUser);
    }catch(error) {
     return res.status(500).json({message:"error al actualizar el usuario",error });
    }
}
export const deleteUser = async (req, res) =>{
    try {
    const userDelete = userModel.findOne({where: { id: req.params.id, deleted: false },
    });
    await ProfileModel.destroy({where: { user_id: user.id }});
    await user.update({ deleted: true });
    return res.status(200).json("usuario eliminado", userDelete);
   }catch (error) {
    return res.status(500).json({ message: "error al eliminar el usuario", error });
  }
}