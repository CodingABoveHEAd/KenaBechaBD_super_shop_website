import mongoose, { mongo } from 'mongoose'

const addressSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        re,quired:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipcode:{
        type:number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
     phone:{
        type:String,
        required:true
    },
})

const Address=mongoose.models.address||
mongoose.model('Address',addressSchema);

export default Address;