import { validateEmail, validateLastName, validateName, validateNickname, validatePassword } from "../../Utils/Validator.js";
import User from "./Modelo.js";
import CONFIDENCE from "../../Config/Config_Conexion.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (data) => {
 
  if (!data.name || !data.last_name || !data.email || !data.nickname || !data.password) throw new Error('MISSING_DATA')

  const email_exist = await User.findOne({ email: data.email })
  const nickname_exist = await User.findOne({ nickname: data.nickname })

  if (email_exist || nickname_exist) throw new Error('ALLREADY_EXIST')

  if (!validateEmail(data.email)) throw new Error('INVALID_CREDENTIALS_EMAIL')
  if (!validatePassword(data.password)) throw new Error('INVALID_CREDENTIALS_PASSWORD')

  try {
    const saltRounds = parseInt(CONFIDENCE.LOOPDB*CONFIDENCE.LOOOPDB*CONFIDENCE.LOOOOPDB);
    data.password = bcrypt.hashSync(data.password, saltRounds);
    
      data.role = "user"
      data.is_active = true
      data.confirmed = false
      data.MasterPoints = 0
      data.isSeeded = false

    await new User(data).save()

    return {
      succes: true,
      message: "Gracias por Registrarte",
    };
  } catch (error) {
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

      const token = jwt.sign({ user: user_exist }, CONFIDENCE.SECRETDB, { expiresIn: '12h' });
      return {
          succes: true,
          data: user_exist,
          token: token
      }
  } catch (error) {
      throw new Error('BAD_REQUEST')
  }
}

export const modify_user = async (data_token, id, data) => {
  const user_token = data_token.user

  if (user_token === undefined) throw new Error('INVALID_CREDENTIALS')
  if (!(data.name || data.last_name || data.email || data.nickname || data.password)) throw new Error('MISSING_DATA_MODIFY')

  if (user_token.role === "user") { id = user_token._id }
  if (!id) { id = user_token._id }

  let user_to_update
  try {
      user_to_update = await User.findById(id)
  } catch {
      throw new Error('NOT_FOUND')
  }

  if (data.name) { if (!validateName(data.name)) { throw new Error('INVALID_CREDENTIALS') } }
  if (data.last_name) { if (!validateLastName(data.last_name)) { throw new Error('INVALID_CREDENTIALS') } }
  if (data.email) { if (!validateEmail(data.email)) { throw new Error('INVALID_CREDENTIALS') } }
  if (data.nickname) { if (!validateNickname(data.nickname)) { throw new Error('INVALID_CREDENTIALS') } }
  if (data.password) { if (!validatePassword(data.password)) { throw new Error('INVALID_CREDENTIALS') } }

  if (user_to_update && data.name) {
      user_to_update.name = data.name;
  }
  if (user_to_update && data.last_name) {
      user_to_update.last_name = data.last_name;
  }
  if (user_to_update && data.email) {
      user_to_update.email = data.email;
  }
  if (user_to_update && data.nickname) {
      user_to_update.nickname = data.nickname;
  }
  if (user_to_update && data.password) {
      user_to_update.password = data.password;
  }
  if (data.role || data.is_active || data.confirmed) {
      if (user_token.role === "admin" || user_token.role === "super_admin") {
          if (user_to_update && (data.role === "user" || data.role === "rider" || data.role === "admin")) {
              user_to_update.role = data.role
          }
          if (user_to_update && data.is_active) {
              user_to_update.is_active = data.is_active
          }
          if (user_to_update && data.confirmed) {
              user_to_update.confirmed = data.confirmed
          }
      }
  }

  try {
      if (user_to_update) {
          await user_to_update.save();
          return {
              success: true,
              message: "Usuario modificado",
          };
      } else {
          return {
              success: false,
              message: "No hay usuario para modificar",
          };
      }

  } catch (err) {
    console.log(err)
      throw new Error('BAD_REQUEST')
  }
}

export const delete_user = async (data_token, id) => {

  const user_token = data_token.user

  if (user_token === undefined) throw new Error('INVALID_CREDENTIALS')
  if (user_token.is_active === false) throw new Error('DELETED')

  if (user_token.role === "user") { id = user_token._id }
  if (!id) { id = user_token._id }



  try {
      const user_to_delete = await User.findById(id)
      if (user_to_delete) {
          user_to_delete.is_active = false
          await user_to_delete.save();
          return {
              success: true,
              message: "Usuario borrado",
          };
      } else {
          return {
              success: false,
              message: "No hay usuario para borrar",
          };
      }

  } catch (err) {
      throw new Error('BAD_REQUEST')
  }
}

export const score_user = async (data_token, id , masterPoints) => {

  const user_token = data_token.user

  if (user_token === undefined) throw new Error('INVALID_CREDENTIALS')
  if (user_token.is_active === false) throw new Error('DELETED')

  if (user_token.role === "user") { id = user_token._id }
  if (!id) { id = user_token._id }

  try {
      const user_score = await User.findById(id)
      if (user_score) {
          user_score.MasterPoints = parseInt(user_score.MasterPoints)+parseInt(masterPoints.score);
          await user_score.save();
          return {
              success: true,
              message: "Nuevo Record",
          };
      } else {
          return {
              success: false,
              message: "No hay usuario para borrar",
          };
      }

  } catch (err) {
      throw new Error('BAD_REQUEST')
  }
}

export const data_user = async (data_token , id ) => {
  const user_token = data_token.user
  let user;

  if (user_token === undefined) throw new Error('INVALID_CREDENTIALS')
  if (user_token.is_active === false) throw new Error('DELETED')

  try {
      if (!id) {
          user = await User.findById(user_token._id)
      } else {
          if (user_token.role === "user" || user_token.role === "rider") { id = user_token._id }
          user = await User.findById(id)
      }

      try {
          if (user) {
              return {
                  success: true,
                  message: "Usuario",
                  data: user
              };
          } else {
              return {
                  success: false,
                  message: "No hay usuario para mostrar",
              };
          }

      } catch (err) {
          throw new Error('BAD_REQUEST')
      }
  } catch {
      throw new Error('NOT_FOUND')
  }
}

export const list_users = async (data_token , page_params ) => {
  const user_token = data_token.user

  let page = page_params ? parseFloat(page_params) : 1
  const pageSize = 10;

  const options = {
      page,
      limit: pageSize
  };

  if (user_token === undefined) throw new Error('INVALID_CREDENTIALS')

  if (user_token.is_active === false) throw new Error('DELETED')

  if (user_token.role === "user" ) throw new Error('UNAUTHORIZATION')


  try {

      let users = await User.paginate({}, options)

      if (page > users.totalPages) {
          options.page = 1;
          users = await User.paginate({}, options)
      }

      if (users.docs.length > 0) {
          return {
              success: true,
              message: "Usuario",
              data: users
          };
      } else {
          return {
              success: false,
              message: "No hay usuario para mostrar",
          };
      }
  } catch {
      throw new Error('NOT_FOUND')
  }
}