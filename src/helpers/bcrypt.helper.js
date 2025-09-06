import bcrypt from "bcrypt";

export const hashPassword =(password)=>{
    try {
        return bcrypt.hash(password, 10);
    } catch (error) {
        console.error("error al hashear la contraseña", error);
        throw new Error("no se puede hashear la contraseña");
    }
};
export const comparePassword =(password, hashPassword)=>{
    try {
        //compara la contraseña de texto con la hasheada 
        return bcrypt.compare(password, hashPassword);
    } catch (error) {
        console.error("error al comparar las contraseñas", error);
        throw new Error("error en la autenticacion")
    }
};