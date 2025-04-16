import { authenticated } from "@/middleware/isAuthenticated";
import { BankSlipController } from "@/useCases/BankSlip/BankSlipController";
import { Router } from "express";

const bankSlipController = new BankSlipController();

export const RoutesBankSlip = Router();

RoutesBankSlip.post(
  "/create",
  authenticated,
  bankSlipController.createBankSlip
);

RoutesBankSlip.get(
  "/listAllStoreByStore",
  authenticated,
  bankSlipController.listAllByStore
);

RoutesBankSlip.delete(
  "/deleteById/:bankSlipId",
  authenticated,
  bankSlipController.deleteById
);

RoutesBankSlip.get(
  "/CheckValidityBankSlip",
  authenticated,
  bankSlipController.CheckValidityBankSlip
);
