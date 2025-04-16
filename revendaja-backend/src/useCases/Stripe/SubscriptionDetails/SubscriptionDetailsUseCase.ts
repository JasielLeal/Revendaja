import { AppError } from "@/lib/AppError";
import Stripe from "stripe";

export class SubscriptionDetailsUseCase {
  async execute(customerId: string) {
    const stripe = new Stripe(process.env.STRIPE_SK);

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      throw new AppError("Nenhuma assinatura encontrada", 404);
    }

    const subscription = subscriptions.data[0];

    const customer = await stripe.customers.retrieve(customerId);
    const paymentMethod = await stripe.paymentMethods.retrieve(
      customer.invoice_settings?.default_payment_method as string
    );

    const nextPaymentDate = new Date(subscription.current_period_end * 1000);
    
    const subscriptionDetails = {
      last4: paymentMethod.card.last4,
      brand: paymentMethod.card.brand,
      nextPaymentDate: nextPaymentDate.toISOString(),
      amount: subscription.items.data[0].price.unit_amount / 100,
      cancel_at: subscription.cancel_at,
    };

    return subscriptionDetails;
  }
}
