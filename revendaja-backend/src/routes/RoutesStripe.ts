import { authenticated } from "@/middleware/isAuthenticated";
import { StripeController } from "@/useCases/Stripe/StripeController";
import { Router } from "express";

const stripeConstroller = new StripeController();

export const RoutesStripe = Router();

RoutesStripe.get("/FetchPublishableKey", stripeConstroller.FecthPublishableKey);

RoutesStripe.post(
  "/CreatePaymentIntent",
  authenticated,
  stripeConstroller.CreatePaymentIntent
);

RoutesStripe.get(
  "/SubscriptionDetails",
  authenticated,
  stripeConstroller.SubscriptionDetails
);

RoutesStripe.post(
  "/CreateSubscription",
  authenticated,
  stripeConstroller.CreateSubscription
);

RoutesStripe.put(
  "/CancelSubscriptionAtEndPeriod",
  authenticated,
  stripeConstroller.CancelSubscriptionAtEndPeriod
);
