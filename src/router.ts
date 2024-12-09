import { Router } from "express";
import { createAccount, login } from "./handlers";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";

const router = Router()
//Creacion de Router 

//Routing 
//Autenticacion y registro 
// req(es el usuario envia) res(es la respuesta del servidor)
router.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle no puede ir vasio'),
    body('name').notEmpty().withMessage('El nombre no puede ir vasio'),
    body('email').isEmail().withMessage('Email no valido'),
    body('password').isLength({ min: 8 }).withMessage('El password es muy corto minimo 8 caracteres'),
   handleInputErrors,
    createAccount)

//Login 
router.post('/auth/login',
    body('email').isEmail().withMessage('Email no valido'),
    body('password').notEmpty().withMessage('El password es obligatorio'),
    login
)


export default router