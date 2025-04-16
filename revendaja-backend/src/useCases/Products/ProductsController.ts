import { AppError } from "@/lib/AppError";
import { Request, Response } from "express";
import { CreateProductsDTO } from "./CreateProducts/CreateProductDTO";
import { PrismaProductsRepository } from "@/repositories/products/PrismaProductsRepository";
import { CreateProductsUseCase } from "./CreateProducts/CreateProductsUseCase";
import { GetAllUseCase } from "./GetAll/GetAllUseCase";
import { GetProductByIdUseCase } from "./GetProductById/GetProductByIdUseCase";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";

const upload = multer({ storage: multer.memoryStorage() });

export class ProductsController {
  uploadImage = upload.single("image");
  async CreateProducts(request: Request, response: Response) {
    try {
      const {
        name,
        normalPrice,
        suggestedPrice,
        brand,
        company,
        barcode,
        category
      }: CreateProductsDTO = request.body;

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

      const prismaProductsRepository = new PrismaProductsRepository();
      const createProductsUseCase = new CreateProductsUseCase(
        prismaProductsRepository
      );

      const newProduct = await createProductsUseCase.execute({
        name,
        normalPrice,
        suggestedPrice,
        brand,
        company,
        imgUrl,
        barcode,
        category
      });

      return response.status(200).send(newProduct);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async GetAll(request: Request, response: Response) {
    try {
      let { page, pageSize, search, filter } = request.query;

      // Converter `page` e `pageSize` para números, assumindo valores padrão se não forem definidos
      const pageNumber = page ? Number(page) : 1;
      const pageSizeNumber = pageSize ? Number(pageSize) : 5;

      const prismaProductsRepository = new PrismaProductsRepository();
      const getAllUseCase = new GetAllUseCase(prismaProductsRepository);

      const products = await getAllUseCase.execute({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search as string,
        filter: filter as string,
      });

      return response.status(200).send(products);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async GetProductById(request: Request, response: Response) {
    try {
      const { productId } = request.body;

      const prismaProductsRepository = new PrismaProductsRepository();

      const getProductByIdUseCase = new GetProductByIdUseCase(
        prismaProductsRepository
      );

      const product = await getProductByIdUseCase.execute(productId);

      return response.status(200).send(product);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }
}
