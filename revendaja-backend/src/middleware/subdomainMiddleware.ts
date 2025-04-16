import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const subdomainMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const host = req.hostname; // Obtém o hostname da requisição
  const subdomain = host.split(".")[0]; // Obtém o subdomínio

  if (subdomain && subdomain !== "www" && subdomain !== "revendaja") {
    try {
      const store = await prisma.store.findUnique({
        where: { subdomain: subdomain },
      });

      if (!store) {
        return res.status(404).send("Loja não encontrada");
      }

      // Armazena a loja na requisição para uso posterior
      req.store = store; // Você pode definir a propriedade 'store' no objeto req
      next(); // Chama o próximo middleware ou rota
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro no servidor");
    }
  } else {
    next(); // Chama o próximo middleware ou rota
  }
};
