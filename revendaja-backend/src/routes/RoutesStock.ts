import { authenticated } from "@/middleware/isAuthenticated";
import { StockController } from "@/useCases/Stock/StockController";
import { Router } from "express";

const stockConstroller = new StockController();
export const RoutesStock = Router();

RoutesStock.get(
  "/FindProductsOnPromotion",
  stockConstroller.FindProductsOnPromotion
);

RoutesStock.get("/findProductInStock", stockConstroller.FindProductInStock);

RoutesStock.get("/SearchDinamic", stockConstroller.SearchDinamic);

RoutesStock.get("/FindNewProducts", stockConstroller.FindNewProducts);

RoutesStock.use(authenticated);

RoutesStock.post(
  "/create",
  authenticated,
  stockConstroller.AddProductToStoreStock
);
RoutesStock.get("/getstock", authenticated, stockConstroller.FindStoreItems);

RoutesStock.get("/", stockConstroller.FindStoreProductsByCompanyName);

RoutesStock.get("/findById", stockConstroller.FindProductById);

RoutesStock.put(
  "/addPromotionInProduct",
  stockConstroller.addPromotionInProduct
);

RoutesStock.put(
  "/removePromotionInProductUse",
  stockConstroller.removePromotionInProductUseCase
);

RoutesStock.post(
  "/findProductsByBarcode",
  authenticated,
  stockConstroller.findProductByBarCode
);

RoutesStock.delete(
  "/DeleteStockItem",
  authenticated,
  stockConstroller.DeleteStockItem
);

RoutesStock.put(
  "/DisabledProduct",
  authenticated,
  stockConstroller.DisabledProduct
);

RoutesStock.put(
  "/AddQuantityToProductInStock",
  authenticated,
  stockConstroller.AddQuantityToProductInStock
);

RoutesStock.put(
  "/UpdateStockItemQuantity",
  authenticated,
  stockConstroller.UpdateStockItemQuantity
);

RoutesStock.put(
  "/UpdateStockNewPrice",
  authenticated,
  stockConstroller.UpdateStockNewPrice
);