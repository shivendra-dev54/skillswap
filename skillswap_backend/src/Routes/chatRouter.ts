import { Router } from "express";
import chatController from "../Controllers/chatController";
import validateTokens from "../Middlewares/validateTokens";

const ChatRouter = Router();

ChatRouter.route("/api/chat/get_chats").post(validateTokens, chatController.getMessages);

export default ChatRouter;