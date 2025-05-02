import express, {json} from "express";
import cors from "cors";
import AuthRouter from "./Routes/authRouter";
import dbConnect from "./config/dbConnect";
import SkillRouter from "./Routes/skillRouter";

const app = express();

dbConnect();

app.use(cors());
app.use(json());
app.use(AuthRouter);
app.use(SkillRouter);

export default app;