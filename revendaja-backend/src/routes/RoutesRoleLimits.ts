import { RoleLimitsController } from "@/useCases/RoleLimits/RoleLimitsController";
import { Router } from "express";

const roleLimitsController = new RoleLimitsController();

export const RoutesRoleLimits = Router();

RoutesRoleLimits.post(
  "/CreateRoleLimits",
  roleLimitsController.CreateRoleLimit
);
