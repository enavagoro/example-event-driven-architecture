import { Server as SocketIOServer, Socket } from "socket.io";

let ioInstance: SocketIOServer | null = null;

export const initializeSocket = (io: SocketIOServer) => {
  ioInstance = io; 

  io.on("connection", (socket: Socket) => {
    console.log("A client connected");

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
}

export async function emitDataRoom (room: string, event: string, data: object) {
  if (ioInstance) {
    ioInstance.to(room).emit(event, JSON.stringify(data));
  } else {
    console.error("Socket.IO instance not initialized");
  }
}

export async function emitDataEvent (event: string, data: object) {
  if (ioInstance) {
    ioInstance.emit(event, JSON.stringify(data));
  } else {
    console.error("Socket.IO instance not initialized");
  }
}