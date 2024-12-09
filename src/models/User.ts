import mongoose, {Schema}from "mongoose";


export interface IUser {
    handle:string,
    name:string,
    email:string,
    password:string
}

//Schema se define los modelos 
const userSchema = new Schema({
    handle:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    name:{
        type:String,
        require:true, //Un registro no tiene un nombre basido 
        trim:true //Si un usuario usa un nombre con espacio lo elimina 
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,// que el user no tenga el mismo email 
        lowercase:true,
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
})

const User = mongoose.model<IUser>('User',userSchema)
export default User 
