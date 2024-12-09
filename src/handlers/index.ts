import type { Request, Response } from "express"
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { validationResult } from "express-validator"

export const createAccount = async (req: Request, res: Response) => {


  const { email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    const error = new Error('Un usuario con ese mail ya esta registrado')
    res.status(409).json({ error: error.message })
    return
  }

  const handle = slug(req.body.handle, '')
  const handleExists = await User.findOne({ handle })
  if (handleExists) {
    const error = new Error('Nombre del usuario no disponible')
    res.status(409).json({ error: error.message })
    return
  }

  const user = new User(req.body)
  user.password = await hashPassword(password)
  user.handle = handle


  await user.save()
  res.send('Registo Creado Correctamente')
}

export const login = async (req: Request, res: Response) => {
  //Manejar errores 
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  //validacion de usuario esta registrado 
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('El usuario no existe')
    res.status(404).json({ error: error.message })
    return
  }
  //Comprobar el password
  const isPasswordCorrect = await checkPassword(password,user.password)
  if (!isPasswordCorrect) {
    const error = new Error('Password incorecto')
    res.status(401).json({ error: error.message })
    return
  }
  res.send('Autenticado..!')
}