import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
config();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.io setup
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("joinGroup", ({ userId, groupId }) => {
    socket.join(groupId);
    io.to(groupId).emit("message", `${userId} has joined the group`);
  });

  socket.on("sendMessage", ({ groupId, message }) => {
    io.to(groupId).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
});
