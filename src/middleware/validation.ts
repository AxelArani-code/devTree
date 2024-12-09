import type { Request,Response,NextFunction } from "express"
import { validationResult } from "express-validator"

//Muestra las validaciones de cada campo 


export const handleInputErrors= (req:Request, res:Response, next:NextFunction)=>{
      //Manejar errores 
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  //Next funciona como sigue la siguiente funcion 
  next()
}