import { validationResult } from "express-validator";

//aca se revisa la soli
export const validator =(req, res, next)=>{
    //pido el resultqdo de la validacion
    const result = validationResult(req)
    //pedir q explique q pasa aca

    //si el result no esta vacio hay error(pq???)
    if(!result.isEmpty()){
        //entonces para y envia la res con el error
        return res.json({errors: result.mapped()});
    }
    //si el if es falso hace el next
    next();
};
