import { error } from "console";

export const adminMiddleware = (req, res, next) => {

    // si el usuario existe y su rol es admin, permite acceso
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "acceso unico para administradores", error});
    }
};

