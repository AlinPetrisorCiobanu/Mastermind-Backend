import { validateEmail, validatePassword } from "../../Utils/Validator.js";
import User from "./Modelo.js";
import CONFIDENCE from "../../Config/Config_Conexion.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (data) => {
 
  if (!data.name || !data.last_name || !data.date || !data.phone || !data.email || !data.nickname || !data.password) throw new Error('MISSING_DATA')

  const phone_exist = await User.findOne({ phone: data.phone })
  const email_exist = await User.findOne({ email: data.email })
  const nickname_exist = await User.findOne({ nickname: data.nickname })

  if (phone_exist || email_exist || nickname_exist) throw new Error('ALLREADY_EXIST')

  if (!validateEmail(data.email)) throw new Error('INVALID_CREDENTIALS_EMAIL')
  if (!validatePassword(data.password)) throw new Error('INVALID_CREDENTIALS_PASSWORD')

  try {

    const saltRounds = parseInt(CONFIDENCE.LOOPDB*CONFIDENCE.LOOOPDB*CONFIDENCE.LOOOOPDB);
    console.log(saltRounds)
    data.password = bcrypt.hashSync(data.password, saltRounds);
    
      data.role = "user"
      data.is_active = true
      data.confirmed = false

    await new User(data).save()

    return {
      succes: true,
      message: "Gracias por Registrarte",
    };
  } catch (error) {
    console.log(error)
    throw new Error('BAD_REQUEST')
}
}

export const login = async (data) => {

  const user_exist = await User.findOne({ $or: [{ email: data.email }, { nickname: data.nickname }] });
  if (!user_exist) throw new Error('EMAIL_PASSWORD')
  if (user_exist.is_active === false) throw new Error('DELETED')
  try {
      const compare_password = bcrypt.compareSync(data.password, user_exist.password)
      if (!compare_password) throw new Error('EMAIL_PASSWORD')

      const token = jwt.sign({ user: user_exist }, CONFIDENCE.SECRETDB, { expiresIn: '24h' });

      return {
          succes: true,
          data: user_exist,
          token: token
      }
  } catch (error) {
      throw new Error('BAD_REQUEST')
  }
}
