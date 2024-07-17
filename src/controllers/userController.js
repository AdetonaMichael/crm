import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const loginRequired = (req, res, next) =>{
    if(req.user){
        next();
    }else{
        return res.status(401).json({message:'Unauthorized User!!'});
    }
}


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            username,
            email,
            hashPassword: bcrypt.hashSync(password, 10)
        });

        const user = await newUser.save();

        user.hashPassword = undefined;

        res.status(201).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
};

export { register };


export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: 'Authentication Failed. No user Found' });
        }

        if (!user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication Failed. Wrong Password' });
        }

        const token = jwt.sign(
            { email: user.email, username: user.username, _id: user.id },
            'RESTFULAPIs'
        );

        return res.json({ token });
    } catch (err) {
        res.status(500).send(err);
    }
};
