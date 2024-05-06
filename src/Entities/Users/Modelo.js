import {model,Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
        enum : ["guest","user","admin","super_admin"]
    },
    is_active:{
        type:Boolean,
        default : false
    },
    confirmed:{
        type:Boolean,
        default : false
    },
    MasterPoints:{
        type:Number,
        default : 0
    },
    isSeeded:{
        type:Boolean,
        default:false
    }
},{versionkey:true,timestamps:true});

UserSchema.plugin(mongoosePaginate);

const User = model('Users' , UserSchema)

export default User;