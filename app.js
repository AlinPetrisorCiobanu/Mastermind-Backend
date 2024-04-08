import express from "express";
import router from "./src/Entities/Users/Router.js";
import conectionDB from "./src/Database/Database.js"; 


const app = express()

const PORT = process.env.PORT || 3000;

//ruta
app.get('/' , (req , res) => {
    res.status(200).json({status: "OK"})
})

app.use(express.json());
app.use('/', router)

app.listen(PORT, () => {
    console.log("Servidor Levantado")
})

conectionDB();

export default app;