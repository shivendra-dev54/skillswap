import { Server } from "socket.io";
import chatModel from "../Models/chatModel";
import { Server as HttpServer } from "http";

export const initSocket = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log("user connected:", socket.id);

        // Optional: join user's own room
        socket.on("join", ({ userId }) => {
            socket.join(userId);
        });

        
        socket.on("sendMessage", async ({ sender, receiver, message }) => {
            console.log("Incoming message:", { sender, receiver, message });
        
            if (!sender || !receiver || !message) {
                console.error("Missing required message data");
                return;
            }
        
            try {
                const newMsg = await chatModel.create({
                    sender,
                    receiver,
                    message,
                    createdAt: new Date()
                });
        
                // Send message to the receiver's room
                io.to(receiver).emit("receivedMessage", newMsg);
            } catch (err) {
                console.error("Error saving message:", err);
            }
        });
        

        socket.on("disconnect", () => {
            console.log("user disconnected:", socket.id);
        });
    });
};
