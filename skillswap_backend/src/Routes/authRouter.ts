import express from "express";
import authController from "../Controllers/authController";
import validateTokens from "../Middlewares/validateTokens";

const AuthRouter = express.Router();

// for user registration
AuthRouter.route("/api/auth/sign_up").post(authController["signUp"]);

// for logging in
AuthRouter.route("/api/auth/sign_in").post(authController["signIn"]);

// for current logged in user info
AuthRouter.route("/api/auth/current").get(validateTokens, authController["currentUser"]);


export default AuthRouter;