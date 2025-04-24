import Stripe from "stripe";

export class CreateSetupIntentUseCase{
    async execute(customerId: string) {
        const stripe = new Stripe(process.env.STRIPE_SK);

        // Criar o SetupIntent
        const setupIntent = await stripe.setupIntents.create({
            customer: customerId,
        });
        

        return setupIntent;
    }
}