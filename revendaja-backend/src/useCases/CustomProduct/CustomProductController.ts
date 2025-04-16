import { AppError } from "@/lib/AppError";
import { Request, Response } from "express";
import { CreateCustomProductDTO } from "./CreateCustomProduct/CreateCustomProductDTO";
import { PrismaCustomProductRepository } from "@/repositories/customProduct/PrismaCustomProductRepository";
import { CreateCustomProductUseCase } from "./CreateCustomProduct/CreateCustomProductUseCase";
import { PrismaStoreRepository } from "@/repositories/store/PrismaStoreRepository";
import { PrismaStockRepository } from "@/repositories/stock/PrismaStockRepository";
import multer from "multer";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaRoleLimitsRepository } from "@/repositories/roleLimits/PrismaRoleLimits";
import { PrismaUserRepository } from "@/repositories/user/PrismaUserRepository";

const upload = multer({ storage: multer.memoryStorage() });

export class CustomProductController {
  uploadImage = upload.single("image");
  async createCustomProduct(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const {
        name,
        normalPrice,
        suggestedPrice,
        quantity,
        barcode,
      }: CreateCustomProductDTO = request.body;

      const file = request.file;
      let imgUrl = "";

      if (file) {
        const params = {
          Bucket: "revendaja", // Substitua pelo nome do seu bucket
          Key: `produtos/${name.replace(/\s+/g, "")}`, // Caminho dentro do bucket
          Body: file.buffer, // Conteúdo do arquivo
          ContentType: file.mimetype, // Tipo do arquivo
          ACL: "public-read" as const, // Permissão pública
        };

        await s3.send(new PutObjectCommand(params));

        // Gera a URL pública do arquivo
        imgUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
      }

      const { id } = request.user;

      const prismaCustomProductRepository = new PrismaCustomProductRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const prismaStockRepository = new PrismaStockRepository();
      const prismaUserRepository = new PrismaUserRepository();
      const prismaRoleLimitsRepository = new PrismaRoleLimitsRepository();

      const createCustomProductUseCase = new CreateCustomProductUseCase(
        prismaCustomProductRepository,
        prismaStoreRepository,
        prismaStockRepository,
        prismaRoleLimitsRepository,
        prismaUserRepository
      );

      const customProduct = await createCustomProductUseCase.execute({
        name,
        normalPrice,
        suggestedPrice,
        imgUrl,
        userId: id,
        quantity: Number(quantity),
        barcode,
      });

      return response.status(200).send(customProduct);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }
      return response.status(500).send({ error: error.message });
    }
  }
}
