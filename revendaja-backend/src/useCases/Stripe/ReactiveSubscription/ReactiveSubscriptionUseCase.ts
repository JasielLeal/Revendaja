import Stripe from "stripe";

export class ReactiveSubscriptionUseCase {
  async execute(subscriptionId: string) {
    const stripe = new Stripe(process.env.STRIPE_SK);

    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    return;
  }
}
