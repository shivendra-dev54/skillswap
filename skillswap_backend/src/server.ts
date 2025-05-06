import { Server as HttpServer } from "http";
import http from 'http';
import app from "./app";
import { initSocket } from "./Sockets/chatSocket";
require("dotenv").config();

const PORT = process.env.PORT
const server = http.createServer(app);

//chat server
initSocket(server);

server.listen(PORT, () => {
    console.log("starting app...")
    console.log(`app is running on port ${PORT}...`)
})