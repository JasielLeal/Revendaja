import Redis from "ioredis";

// Pega a URL do Redis a partir das variáveis de ambiente
const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("A variável de ambiente REDIS_URL não está definida!");
}

// Usando Redis com TLS para a URL segura (rediss://)
export const redis = new Redis(redisUrl);

redis.on("connect", () => {
  console.log("Conectado ao Redis com sucesso!");
});

redis.on("error", (err) => {
  console.error("Erro ao conectar ao Redis:", err);
});
