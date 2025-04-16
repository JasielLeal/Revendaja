import Stripe from "stripe";

export class CreateSubscriptionUseCase {
  async execute(priceId: string, customerId: string, paymentMethodId: string) {
    const stripe = new Stripe(process.env.STRIPE_SK);

    // Associar o método de pagamento ao cliente
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Definir o método de pagamento como o padrão para cobranças futuras
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Criar a assinatura
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ["latest_invoice.payment_intent"],
      metadata: { priceId, locale: "pt-BR" },
    });

    return subscription;
  }
}
