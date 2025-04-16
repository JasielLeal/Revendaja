import { authenticated } from "@/middleware/isAuthenticated";
import { UserController } from "@/useCases/User/UserController";
import { Router } from "express";

const userConstroller = new UserController();

export const RoutesUser = Router();


RoutesUser.post("/create", userConstroller.CreateUser);

RoutesUser.put("/verifyemail", userConstroller.VerifyEmail);
RoutesUser.post("/session", userConstroller.Authenticate);
RoutesUser.put(
  "/DisableAccount",
  authenticated,
  userConstroller.DisableAccount
);
RoutesUser.put("/ForgetPassword", userConstroller.ForgetPassword);
RoutesUser.put("/UpdatePassword", userConstroller.UpdatePassword);
RoutesUser.put(
  "/UpdatedExpoToken",
  authenticated,
  userConstroller.UpdatedExpoToken
);

RoutesUser.put("/UpdatePlan", authenticated, userConstroller.UpdatePlan);

RoutesUser.get("/GetPlan", authenticated, userConstroller.GetPlan);
