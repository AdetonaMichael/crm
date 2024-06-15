import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstname:{
        type:String,
        required: 'Enter first name'
    },
    lastname:{
        type:String,
        required: 'Enter a last name'
    },
    email:{
        type:String
    },
    company:{
        type:String
    },
    phone:{
        type:Number
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});