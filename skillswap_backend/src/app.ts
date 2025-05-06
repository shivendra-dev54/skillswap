import express, {json} from "express";
import cors from "cors";
import AuthRouter from "./Routes/authRouter";
import dbConnect from "./config/dbConnect";
import SkillRouter from "./Routes/skillRouter";
import ChatRouter from "./Routes/chatRouter";

const app = express();

dbConnect();

app.use(cors());
app.use(json());
app.use(AuthRouter);
app.use(SkillRouter);
app.use(ChatRouter);

export default app;