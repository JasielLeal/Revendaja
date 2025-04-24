import Stripe from "stripe";

export class UpdateSubscriptionPaymentMethodUseCase {
  async execute(subscriptionId: string, paymentMethodId: string) {
    const stripe = new Stripe(process.env.STRIPE_SK);

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // 2. Atualizar o método de pagamento default
    await stripe.customers.update(subscription.customer as string, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
  }
}
