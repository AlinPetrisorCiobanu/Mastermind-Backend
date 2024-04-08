export const register = async (data) => {
  if (
    !data.name ||!data.last_name ||!data.date ||!data.phone ||!data.email ||!data.nickname ||!data.password) return("MISSING_DATA");

  try {
    await new User(data).save();
    return {
      succes: true,
      message: "Gracias por Registrarte",
    };
  } catch (error) {
    throw new Error("BAD_REQUEST");
  }
};
