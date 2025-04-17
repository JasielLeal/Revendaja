import { AppError } from "@/lib/AppError";
import { Request, Response } from "express";
import { AddProductToStoreStockDTO } from "./addProductToStoreStock/AddProductToStoreStockDTO";
import { PrismaStockRepository } from "@/repositories/stock/PrismaStockRepository";
import { AddProductToStoreStockUseCase } from "./addProductToStoreStock/AddProductToStoreStockUseCase";
import { PrismaStoreRepository } from "@/repositories/store/PrismaStoreRepository";
import { PrismaProductsRepository } from "@/repositories/products/PrismaProductsRepository";
import { FindStoreItemsUseCase } from "./findStoreItems/FindStoreItemsUseCase";
import { PrismaUserRepository } from "@/repositories/user/PrismaUserRepository";
import { FindStoreProductsByCompanyNameUseCase } from "./findStoreProductsByCompanyName/FindStoreProductsByCompanyNameUseCase";
import { FindProductByIdUseCase } from "./findProductById/FindProductByIdUseCase";
import { AddPromotionInProductUseCase } from "./addPromotionInProduct/AddPromotionInProductUseCase";
import { RemovePromotionInProductUseCase } from "./removePromotionInProduct/RemovePromotionInProductUseCase";
import { FindProductsByBarcodeUseCase } from "./findProductsByBarcode/FindProductsByBarcodeUseCase";
import { DeleteStockItemUseCase } from "./deleteStockItem/DeleteStockItemUseCase";
import { FindProductsOnPromotionUseCase } from "./findProductsOnPromotion/findProductsOnPromotionUseCase";
import { FindProductUseCase } from "./findProduct/FindProductUseCase";
import { SearchDinamicUseCase } from "./searchDinamic/SearchDinamicUseCase";
import { FindNewProductsUseCase } from "./findNewProducts/findNewProductsUseCase";
import { PrismaCustomProductRepository } from "@/repositories/customProduct/PrismaCustomProductRepository";
import { DisabledProductUseCase } from "./disabledProduct/DisabledProductUseCase";
import { AddQuantityToProductInStockUseCase } from "./addQuantityToProductInStock/AddQuantityToProductInStockUseCase";
import { PrismaRoleLimitsRepository } from "@/repositories/roleLimits/PrismaRoleLimits";

export class StockController {
  async AddProductToStoreStock(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const {
        barcode,
        customPrice,
        normalPrice,
        suggestedPrice,
        quantity,
      }: AddProductToStoreStockDTO = request.body;

      console.log(barcode, customPrice, normalPrice, suggestedPrice, quantity);

      const { id } = request.user;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaProductsRepository = new PrismaProductsRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const prismaRoleLimits = new PrismaRoleLimitsRepository();
      const prismaUserRepository = new PrismaUserRepository();

      const addProductToStoreStockUseCase = new AddProductToStoreStockUseCase(
        prismaStockRepository,
        prismaStoreRepository,
        prismaProductsRepository,
        prismaUserRepository,
        prismaRoleLimits
      );

      const addProduct = await addProductToStoreStockUseCase.execute({
        userId: id,
        barcode,
        customPrice: Number(customPrice),
        normalPrice: Number(normalPrice),
        suggestedPrice,
        quantity,
      });

      return response.status(200).send(addProduct);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async FindStoreItems(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.user;

      const userId = id;
      const { page = 1, pageSize = 5, search, filter } = request.query;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaUserRepository = new PrismaUserRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const findStoreItemsUseCase = new FindStoreItemsUseCase(
        prismaStockRepository,
        prismaStoreRepository,
        prismaUserRepository
      );

      const stock = await findStoreItemsUseCase.execute({
        userId,
        page: Number(page),
        pageSize: Number(pageSize),
        search: String(search),
        filter: String(filter),
      });

      return response.status(200).send(stock);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async FindStoreProductsByCompanyName(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { page = 1, pageSize = 5, storeName } = request.query;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const findStoreProductsByCompanyNameUseCase =
        new FindStoreProductsByCompanyNameUseCase(
          prismaStoreRepository,
          prismaStockRepository
        );

      const storeStock = await findStoreProductsByCompanyNameUseCase.execute({
        storeName,
        page: Number(page),
        pageSize: Number(pageSize),
      });

      return response.status(200).send(storeStock);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async FindProductById(request: Request, response: Response): Promise<any> {
    try {
      const { subdomain, productId } = request.query;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const findProductByIdUseCase = new FindProductByIdUseCase(
        prismaStockRepository,
        prismaStoreRepository
      );

      const product = await findProductByIdUseCase.execute(
        String(subdomain),
        String(productId)
      );

      return response.status(200).send(product);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async addPromotionInProduct(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { productId, discountValue, subdomain } = request.body;
      const userId = request.user.id;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const addPromotionInProductUseCase = new AddPromotionInProductUseCase(
        prismaStockRepository,
        prismaStoreRepository
      );

      const product = await addPromotionInProductUseCase.execute({
        productId,
        discountValue,
        userId,
      });

      return response.status(200).send(product);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async removePromotionInProductUseCase(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { productId } = request.body;

      const userId = request.user.id;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const removePromotionInProductUseCase =
        new RemovePromotionInProductUseCase(
          prismaStockRepository,
          prismaStoreRepository
        );

      const removePromotion = await removePromotionInProductUseCase.execute(
        productId,
        userId
      );

      return response.status(200).send(removePromotion);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async findProductByBarCode(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { id } = request.user;
      const { barcode } = request.body;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const findProductByBarCodeUseCase = new FindProductsByBarcodeUseCase(
        prismaStockRepository,
        prismaStoreRepository
      );

      const product = await findProductByBarCodeUseCase.execute(barcode, id);

      return response.status(200).send(product);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async DeleteStockItem(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.user;
      const userId = id;

      const { productId } = request.query;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const prismaCustomProductRepository = new PrismaCustomProductRepository();

      const deleteStockItemUseCase = new DeleteStockItemUseCase(
        prismaStockRepository,
        prismaStoreRepository,
        prismaCustomProductRepository
      );

      const product = await deleteStockItemUseCase.execute(
        userId,
        String(productId)
      );

      return response.status(200).send(product);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async FindProductsOnPromotion(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { subdomain, page, pageSize } = request.query;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const findProductsOnPromotionUseCase = new FindProductsOnPromotionUseCase(
        prismaStockRepository,
        prismaStoreRepository
      );

      const products = await findProductsOnPromotionUseCase.execute(
        String(subdomain),
        Number(page),
        Number(pageSize)
      );

      return response.status(200).send(products);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async FindProductInStock(request: Request, response: Response): Promise<any> {
    try {
      const { subdomain, productId } = request.query;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const findProductUseCase = new FindProductUseCase(
        prismaStockRepository,
        prismaStoreRepository
      );

      const product = await findProductUseCase.execute(
        String(subdomain),
        String(productId)
      );

      return response.status(200).send(product);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async SearchDinamic(request: Request, response: Response): Promise<any> {
    try {
      const {
        search,
        page,
        pageSize,
        subdomain,
        orderBy,
        companyFilter,
        categoryFilter,
      } = request.query;

      const prismaStoreRepository = new PrismaStoreRepository();
      const prismaStockRepository = new PrismaStockRepository();

      const searchDinamicUseCase = new SearchDinamicUseCase(
        prismaStoreRepository,
        prismaStockRepository
      );

      const list = await searchDinamicUseCase.execute(
        String(subdomain),
        String(search),
        Number(page),
        Number(pageSize),
        String(orderBy)
      );

      return response.status(200).send(list);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async FindNewProducts(request: Request, response: Response): Promise<any> {
    try {
      const { subdomain } = request.query;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const findNewProductsUseCase = new FindNewProductsUseCase(
        prismaStockRepository,
        prismaStoreRepository
      );

      const productsList = await findNewProductsUseCase.execute({
        subdomain: String(subdomain),
      });

      return response.status(200).send(productsList);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async DisabledProduct(request: Request, response: Response): Promise<any> {
    try {
      const userId = request.user.id;
      const { productId } = request.body;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const disabledProductUseCase = new DisabledProductUseCase(
        prismaStockRepository,
        prismaStoreRepository
      );

      await disabledProductUseCase.execute(userId, productId);

      return response.status(200).send("Produto desabilitado com sucesso");
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async AddQuantityToProductInStock(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { productId, quantity } = request.body;
      const userId = request.user.id;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const addQuantityToProductInStockUseCase =
        new AddQuantityToProductInStockUseCase(
          prismaStockRepository,
          prismaStoreRepository
        );

      const stockUpdated = await addQuantityToProductInStockUseCase.execute({
        userId,
        productId,
        quantity,
      });

      return response.status(200).send(stockUpdated);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }
}
