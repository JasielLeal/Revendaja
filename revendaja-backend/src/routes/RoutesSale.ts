import { authenticated } from "@/middleware/isAuthenticated";
import { SaleController } from "@/useCases/sale/SaleController";
import { Router } from "express";

const saleController = new SaleController();

export const RoutesSale = Router();

RoutesSale.get(
  "/getTheTopBestSellingProducts",
  saleController.GetTheTopBestSellingProducts
);

RoutesSale.post("/ConfirmSale", authenticated, saleController.confirmSale);

RoutesSale.post("/createSalePending", saleController.createSalePending);

RoutesSale.get(
  "/calculateMonthlyBalance/:monthSelect",
  authenticated,
  saleController.calculateMonthlyBalance
);

RoutesSale.delete("/deleteSale", authenticated, saleController.deleteSale);

RoutesSale.post("/create", authenticated, saleController.createSale);
RoutesSale.get("/month/:month", authenticated, saleController.getSalesByStore);
RoutesSale.get(
  "/getLatestThreePurchases",
  authenticated,
  saleController.getLatestThreePurchases
);

RoutesSale.get(
  "/getSalesPendingByStore",
  authenticated,
  saleController.getSalesPendingByStore
);

RoutesSale.get(
  "/bestSellingCompany",
  authenticated,
  saleController.bestSellingCompany
);
