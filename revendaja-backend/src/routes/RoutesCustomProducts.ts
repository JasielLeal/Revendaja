import { authenticated } from "@/middleware/isAuthenticated";
import { CustomProductController } from "@/useCases/CustomProduct/CustomProductController";
import { Router } from "express";

const customProductController = new CustomProductController();

export const RoutesCustomProducts = Router();

RoutesCustomProducts.post(
  "/create",
  authenticated,
  customProductController.uploadImage,
  customProductController.createCustomProduct
);
