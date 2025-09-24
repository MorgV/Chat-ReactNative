import dotenv from "dotenv";
import { Server as SocketIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { registerUserEvents } from "./userEvents.ts";
dotenv.config();

export function initializeSoket(server: any): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: no token provided"));
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return next(new Error("Authentication error: invalid token"));
        }
        let userData = decoded.user;
        socket.data = userData;
        socket.data.userId = userData.id;
        next();
      }
    );
  });

  // когда сокет подключается
  io.on("connection", async (socket: Socket) => {
    const userId = socket.data.userId;
    console.log("user connected: ", userId, `username: `, socket.data.name);

    // Регистрация событий
    registerUserEvents(io, socket);

    // регестрируем событие
    socket.on("disconnect", () => {
      // user log out
      console.log("user disconnected: ", userId);
    });
  });

  return io;
}
