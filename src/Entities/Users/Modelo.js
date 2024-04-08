import {model,Schema} from "mongoose";

export const UserSchema = new Schema({
    name : {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 50
        },
    last_name: {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 80
        },
    date: {
        type : String,
        require : true,
        },
    phone: {
        type : Number,
        require : true,
        unique : true,
        minlength:5,
        maxlength:20
        },
    email: {
        type : String,
        require : true,
        unique : true
        },
    nickname: {
        type : String,
        require : true,
        unique : true
        },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        default : "user",
        enum : ["user","admin","super_admin"]
    },
    is_active:{
        type:Boolean,
        default : false
    },
    confirmed:{
        type:Boolean,
        default : false
    },
    confirmed:{
        type:Number,
        default : 0
    },
},{versionkey:true,timestamps:true});

const User = model('User' , UserSchema)

export default User;