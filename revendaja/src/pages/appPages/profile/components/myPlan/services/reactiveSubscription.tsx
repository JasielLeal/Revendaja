import { backend } from "@/api/backend";

export async function ReactiveSubscription(subscriptionId: string) {
    const response = await backend.post("/stripe/reactivesubscription", {
        subscriptionId: subscriptionId
    })

    return response.data;
}