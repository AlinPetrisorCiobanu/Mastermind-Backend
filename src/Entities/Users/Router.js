import express from "express";
import { register } from "./Controller.js";

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

router.get('/', async (req,res)=>{
    try{
        res.status(201).json(await get_users())
    }
    catch(e){
        next(e)
    }
})

export default router