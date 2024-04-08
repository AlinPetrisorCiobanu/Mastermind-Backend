import jwt from "jsonwebtoken";
import CONFIDENCE from "../Config/Config_Conexion.js";


const validateToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      console.log(token);
      return res.status(401).json({ msg: 'NO AUTORIZADO' });
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ msg: 'Formato de token inválido' });
    }

    const t = tokenParts[1];
    req.user = jwt.verify(t, CONFIDENCE.SECRETDB);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: "Token inválido" });
    }
    next(error);
  }
};

export { validateToken };