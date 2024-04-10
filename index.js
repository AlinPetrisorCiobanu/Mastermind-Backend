import express from "express";
import router from "./src/Entities/Users/Router.js";
import conectionDB from "./src/Database/Database.js"; 
import errorHandler from "./src/Middleware/Middleware.js";
import cors from "cors";
import seedUsers from "./src/Seed/userSeeders.js";
import clearSeedData from "./src/Seed/clearSeeders.js";


const app = express()

const PORT = process.env.PORT || 3000;

//ruta
app.get('/' , (req , res) => {
    res.status(200).json({status: "OK"})
})

app.use(express.json());
app.use('/', router)
app.use(cors)

app.listen(PORT, () => {
    console.log("Servidor Levantado")
})

// seedUsers();
// clearSeedData();

conectionDB();

app.use(errorHandler)

export default app;