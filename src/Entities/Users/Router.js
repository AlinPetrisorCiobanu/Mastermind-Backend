import express from "express";
import { login, modify_user, register } from "./Controller.js";
import { validateToken } from "../../Middleware/Authorization.js";

const router = express.Router()

router.post('/register',async (req,res,next)=>{
    try{
        res.status(201).json(await register(req.body))
    }
    catch(e){
        next(e)
    }
})

router.post('/login',async (req,res,next)=>{
    try{
        res.status(201).json(await login(req.body))
    }
    catch(e){
        next(e)
    }
})

router.put('/modify_user/:id?', validateToken ,async (req , res , next)=>{
    try{
        res.status(200).json(await modify_user(req.user , req.params.id , req.body))
    }
    catch(e){
        next(e)
    }
})

export default router