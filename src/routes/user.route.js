import express from "express";
import {
    allUser,
    userById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js"

export const userRouter = express.Router()
userRouter.get("user/", allUser);
userRouter.get("user/:id", userById);
userRouter.post("user/", createUser);
userRouter.put("user/:id", updateUser);
userRouter.delete("user/:id", deleteUser);