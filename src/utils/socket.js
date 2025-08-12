const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = new socket.Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", () => {});
    socket.on("sendMessage", () => {});
    socket.on("disconnect", () => {});
  });

  return io;
};

module.exports = initializeSocket;
