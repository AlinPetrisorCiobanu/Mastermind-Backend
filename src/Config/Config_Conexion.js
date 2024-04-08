import dotenv from "dotenv"

dotenv.config()

const CONFIDENCE  = {
    URLDB: process.env.DDBB_URL,
    USERDB: process.env.DDBB_USER,
    PASSWORDDB: process.env.DDBB_PASSWORD,
    LOOPDB: process.env.BCRYTP_LOOP,
    LOOOPDB: process.env.BCRYTP_LOOOP,
    LOOOOPDB: process.env.BCRYTP_LOOOOP,
    SECRETDB: process.env.JWT_SECRET,
    PORTDB: process.env.JWT_PORT,
  };
  export default CONFIDENCE;