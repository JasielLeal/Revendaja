import express from "express";
import "dotenv/config";
import cors from "cors";
import { routes } from "./routes";
import { Server } from "socket.io";
import http from "http";
import { swaggerUi, swaggerSpec } from '../swagger';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(routes);

// Criando o servidor HTTP
const server = http.createServer(app);

// Configurando o Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Permite conexões de qualquer origem (ajuste conforme necessário)
  },
});

// Lidando com conexões do Socket.IO
io.on("connection", (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on("join-user", (userId) => {
    socket.join(userId);
    console.log(`Usuário ${socket.id} entrou na sala do usuário ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

//Swegger

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running`);
});

// Exportando o io para ser usado em outros arquivos
export { io };
