import Stripe from "stripe";

export class CancelSubscriptionAtEndPeriodUseCase {
  async execute(subscriptionId: string) {
    const stripe = new Stripe(process.env.STRIPE_SK);

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    return subscription;
  }
}
