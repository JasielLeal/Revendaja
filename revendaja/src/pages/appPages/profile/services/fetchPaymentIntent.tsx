import { backend } from "@/api/backend";

export async function fetchPaymentIntent({
    priceId,
    planName,
}: {
    priceId: string;
    planName: string;
}) {
    const response = await backend.post("/stripe/CreatePaymentIntent", { priceId });

    if (!response.data) {
        throw new Error("clientSecret não recebido da API.");
    }

    return {
        clientSecret: response.data.client_secret,
        planName,
        priceId,
    };
}