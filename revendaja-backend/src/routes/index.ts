import { Router } from "express";
import { RoutesUser } from "./RoutesUser";
import { RoutesStore } from "./RoutesStore";
import { RoutesProducts } from "./RoutesProducts";
import { RoutesStock } from "./RoutesStock";
import { RoutesCustomProducts } from "./RoutesCustomProducts";
import { RoutesSale } from "./RoutesSale";
import { RoutesBankSlip } from "./RoutesBankSlip";
import { RoutesExpenses } from "./RoutesExpense";
import { RoutesStripe } from "./RoutesStripe";
import { RoutesRoleLimits } from "./RoutesRoleLimits";

export const routes = Router();

routes.use("/user", RoutesUser);
routes.use("/store", RoutesStore);
routes.use("/products", RoutesProducts);
routes.use("/stock", RoutesStock);
routes.use("/customproduct", RoutesCustomProducts);
routes.use("/sale", RoutesSale);
routes.use("/bankslip", RoutesBankSlip);
routes.use("/expenses", RoutesExpenses);
routes.use("/stripe", RoutesStripe);
routes.use("/roleLimits", RoutesRoleLimits);
