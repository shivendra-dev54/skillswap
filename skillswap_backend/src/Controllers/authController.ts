import asyncHandler from "express-async-handler";
import UserSchema from "../Models/userModel";
import bcrypt = require("bcryptjs")
import jwt from "jsonwebtoken";
import { Request } from "express";


//@desc POST add new expense
//@route /api/auth/sign_up
//@access public
const signUp = asyncHandler(async (_req, res) => {

    const {username, email, password} = _req.body;

    //if request don't have all data
    if(!username || !email || !password){
        res.status(400).json({
            "error": "all fields are mandatory"
        });
        return;
    }

    //if email already exists
    const sameEmail = await UserSchema.findOne({ email });
    if (sameEmail) {
        res.status(400).json({
            error: "user exist with this email"
        });
        return;
    }

    //if username already exist
    const sameUsername = await UserSchema.findOne({ username });
    if (sameUsername) {
        res.status(400).json({
            error: "user exist with this username"
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = new UserSchema({
        username,
        email,
        password: hashedPassword,
        skills: {}
    });

    newUser = await newUser.save();

    res.status(201).json(newUser);
});




//@desc POST login a user
//@route /api/auth/sign_in
//@access public
const signIn = asyncHandler(async (_req, res) => {
    const {email, password} = _req.body;

    if(!email || !password){
        res.status(400).json({
            "error": "all fields are mandatory"
        });
        return;
    }

    //if user does not exist
    const user = await UserSchema.findOne({ email });
    if (!user) {
        res.status(400).json({
            error: "User with this email does not exist"
        });
        return;
    }

    const passCorrect = await bcrypt.compare(password, String(user.password));
    if (!passCorrect) {
        res.status(400).json({
            error: "Password you entered is incorrect"
        });
        return;
    }

    const token = jwt.sign({
        username: user.username,
        email: user.email,
        passwoprd: user.password,
        skills: user.skillshave,
    },
    process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1h',
    });

    res.status(200).json({
        username: user.username,
        email: user.email,
        token
    });
});




//@desc GET current
//@route /api/auth/current
//@access private
interface customRequest extends Request{
    user?: any;
};
const currentUser = asyncHandler(async (_req: customRequest, res) => {
    res.status(200).json(_req.user);
});


export default {
    signIn,
    signUp,
    currentUser
}
