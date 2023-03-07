import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientsEvents } from "./types";

const app = express()
const port = process.env.PORT || 8000
const server = createServer(app)
const io = new Server<ServerToClientsEvents, ClientToServerEvents>(server)

app.get("/", (req, res) => {
    res.send("Home route api")
})

io.on("connection", (socket) => {
    socket.on("message", (data, room) => {
        console.log(data);

        if (room) {
            socket.join(room);
            io.to(room).emit("message", `${data.name}: ${data.message}`)
        } else {
            console.error("Group name is required")
        }
    })

    socket.on("disconnect", () => {
        console.log("User is disconnected");
    })
})

server.listen({
    port,
    host: "0.0.0.0", // remove, if you are not using WSL.
}, () => {
    console.log(`http://localhost:${port}`);
})
