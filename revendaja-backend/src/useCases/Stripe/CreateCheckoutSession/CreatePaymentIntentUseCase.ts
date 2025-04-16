import Stripe from "stripe";

export class CreatePaymentIntentUseCase {
  async execute(priceId: string, customer: string) {
    const stripe = new Stripe(process.env.STRIPE_SK);

    console.log(priceId, customer)
    // Criar o PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: this.getAmountFromPriceId(priceId), // Função que converte o ID do preço para um valor em centavos
      currency: "brl", // A moeda do pagamento
      customer: customer, // Cliente associado à compra
      metadata: { priceId }, // Armazenando o priceId como metadados para referência futura
      automatic_payment_methods: {
        enabled: true,
      },
      setup_future_usage: "off_session",
    });
    

    return paymentIntent; // Retorna o clientSecret para o frontend
  }

  // Função auxiliar para mapear priceId para o valor correto em centavos
  private getAmountFromPriceId(priceId: string): number {
    // Aqui você deve mapear o priceId para o valor correto do produto ou plano
    const priceMap = {
      price_1R008I2M4f5OsxL2PaSnS3mU: 2990, // Exemplo: Starter = R$29,90
      price_1J4HwvL5hyqEDU0Y1C0ouL0K: 4990, // Exemplo: Premium = R$49,90
    };

    return priceMap[priceId] || 0; // Retorna o valor em centavos
  }
}
