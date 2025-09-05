import express from "express";
import {
      allProfile,
      profileById,
      createProfile,
      updateProfile,
      deleteProfile,
} from "../controllers/profile.controller.js"

export const profileRouter = express.Router()
profileRouter.get("profile/", allProfile);
profileRouter.get("profile/:id", profileById);
profileRouter.post("profile/", createProfile);
profileRouter.put("profile/:id", updateProfile);
profileRouter.delete("profile/:id", deleteProfile);