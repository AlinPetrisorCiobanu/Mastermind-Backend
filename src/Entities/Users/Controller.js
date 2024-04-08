import User from "./Modelo.js";

export const register = async (data) => {
 

  try {

    await new User(data).save()

    return {
      succes: true,
      message: "Gracias por Registrarte",
    };
  } catch (error) {
    return error.message;
}
};
