import { authenticated } from "@/middleware/isAuthenticated";
import { StoreController } from "@/useCases/Store/StoreController";
import { Router } from "express";

const storeConstroller = new StoreController();

export const RoutesStore = Router();

RoutesStore.get(
  "/verifysubdomain/:subdomain",
  storeConstroller.VerifySubdomain
);

RoutesStore.post("/create", authenticated, storeConstroller.CreateStore);

RoutesStore.get(
  "/FindStoreNameByUser",
  authenticated,
  storeConstroller.FindStoreNameByUser
);

RoutesStore.put("/activeStore", authenticated, storeConstroller.ActiveStore);
