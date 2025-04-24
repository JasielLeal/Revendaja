import { AppError } from "@/lib/AppError";
import { Request, Response } from "express";
import { FetchPublishableKeyUseCase } from "./FetchPublishableKeyUseCase";
import { CreatePaymentIntentUseCase } from "./CreateCheckoutSession/CreatePaymentIntentUseCase";
import { SubscriptionDetailsUseCase } from "./SubscriptionDetails/SubscriptionDetailsUseCase";
import { CreateSubscriptionUseCase } from "./CreateSubscription/CreateSubscriptionUseCase";
import { CancelSubscriptionAtEndPeriodUseCase } from "./CancelSubscriptionAtEndPeriod/CancelSubscriptionAtEndPeriodUseCase";
import { ReactiveSubscriptionUseCase } from "./ReactiveSubscription/ReactiveSubscriptionUseCase";
import { CreateSetupIntentUseCase } from "./CreateSetupIntent/CreateSetupIntentUseCase";
import { UpdateSubscriptionPaymentMethodUseCase } from "./UpdateSubscriptionPaymentMethod/UpdateSubscriptionPaymentMethodUseCase";

export class StripeController {
  async FecthPublishableKey(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const fecthPublishableKeyUseCas = new FetchPublishableKeyUseCase();
      const publishableKey = await fecthPublishableKeyUseCas.execute();

      return response.status(200).send(publishableKey);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async CreatePaymentIntent(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { priceId } = request.body;

      const customer = request.user.stripeCustomerId;
      const createCheckoutSession = new CreatePaymentIntentUseCase();

      const checkout = await createCheckoutSession.execute(priceId, customer);

      return response.status(200).send(checkout);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async SubscriptionDetails(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const customerId = request.user.stripeCustomerId;

      const subscriptionDetailsUseCase = new SubscriptionDetailsUseCase();
      const subscription = await subscriptionDetailsUseCase.execute(customerId);

      return response.status(200).send(subscription);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async CreateSubscription(request: Request, response: Response): Promise<any> {
    try {
      const customerId = request.user.stripeCustomerId;

      const { priceId, paymentMethodId } = request.body;

      const createSubscriptionUseCase = new CreateSubscriptionUseCase();

      const subscription = await createSubscriptionUseCase.execute(
        priceId,
        customerId,
        paymentMethodId
      );

      return response.status(200).send(subscription);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async CancelSubscriptionAtEndPeriod(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { subscriptionId } = request.body;

      const cancelSubscription = new CancelSubscriptionAtEndPeriodUseCase();
      const subscription = await cancelSubscription.execute(subscriptionId);

      return response.status(200).send(subscription);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async ReactiveSubscription(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { subscriptionId } = request.body;

      const reactiveSubscription = new ReactiveSubscriptionUseCase();
      await reactiveSubscription.execute(subscriptionId);

      return response.status(200).send("Subscription reactivated successfully");
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async CreateSetupIntent(request: Request, response: Response): Promise<any> {
    try {
      const customerId = request.user.stripeCustomerId;
      const createSetupIntentUseCase = new CreateSetupIntentUseCase();
      const setupIntent = await createSetupIntentUseCase.execute(customerId);

      return response.status(200).send(setupIntent.client_secret);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async UpdatePaymentMethod(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { paymentMethodId } = request.body;
      const customerId = request.user.stripeCustomerId;

      const updateSubscriptionPaymentMethodUseCase =
        new UpdateSubscriptionPaymentMethodUseCase();
      await updateSubscriptionPaymentMethodUseCase.execute(
        customerId,
        paymentMethodId
      );

      return response.status(200).send("Payment method updated successfully");
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }
}
