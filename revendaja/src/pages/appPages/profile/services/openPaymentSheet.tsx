import { initPaymentSheet, presentPaymentSheet, retrievePaymentIntent } from "@stripe/stripe-react-native";
import { CreateSubscription } from "./CreateSubscription";
import { ActiveStore } from "../components/myPlan/services/activeStore";
import { UpdatePlan } from "./UpdatePlan";

export async function openPaymentSheet({
    clientSecret,
    planName,
    priceId,
}: {
    clientSecret: string;
    planName: string;
    priceId: string;
}) {
    const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Revendaja',
    });

    if (error) throw new Error(error.message);

    const { error: paymentError } = await presentPaymentSheet();
    if (paymentError) throw new Error(paymentError.message);

    const paymentIntent = await retrievePaymentIntent(clientSecret);
    const paymentMethodId = paymentIntent?.paymentIntent?.paymentMethodId;
    if (!paymentMethodId) throw new Error("Não foi possível recuperar o ID do método de pagamento.");

    // Essas chamadas são parte da "ação principal"
    await CreateSubscription(priceId, paymentMethodId);
    await ActiveStore();
    await UpdatePlan(planName);

    // Retorne o que precisar para o `onSuccess` usar depois
    return { planName };
}