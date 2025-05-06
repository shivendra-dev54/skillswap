import asyncHandler from "express-async-handler";
import chatModel from "../Models/chatModel";
import { Request, Response } from "express";

// Extend the Request type to include user and body
interface CustomRequest extends Request {
    user?: {
        username: string;
        [key: string]: any;
    };
    body: {
        other_user?: string;
        [key: string]: any;
    };
}

//@desc GET chat messages between two users
//@route POST /api/chat/get-messages
//@access Private (assuming auth middleware sets req.user)
const getMessages = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { other_user } = req.body;
    const currentUser = req.user?.username;

    if (!currentUser || !other_user) {
        res.status(400);
        throw new Error("Both users are required.");
    }

    const chats = await chatModel.find({
        $or: [
            { sender: currentUser, receiver: other_user },
            { sender: other_user, receiver: currentUser }
        ]
    }).sort({ createdAt: 1 }); // optional: sort by time

    res.status(200).json({ chats });
});

export default {
    getMessages
};
