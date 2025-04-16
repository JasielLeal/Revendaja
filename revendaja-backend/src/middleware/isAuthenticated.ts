import { prisma } from "@/lib/prisma";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
type JwTPayload = {
  id: string;
};

export const authenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json({ message: "Token não encontrado." });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Token inválido.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return response
        .status(500)
        .json({ message: "JWT Secret não configurado." });
    }

    const { id } = jwt.verify(token, jwtSecret ?? "") as JwTPayload;

    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      return response.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    const { password, ...userWithoutPassword } = user;

    request.user = userWithoutPassword;

    next();
  } catch (error) {
    console.error("Erro de autenticação:", error); // Log do erro
    return response
      .status(401)
      .json({ message: "Erro inesperado com o token." });
  }
};
