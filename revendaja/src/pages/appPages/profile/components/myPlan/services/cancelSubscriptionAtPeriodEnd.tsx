import { backend } from "@/api/backend";

export async function CancelSubscriptionAtPeriodEnd(subscriptionId: string) {
  const response = await backend.put("/stripe/CancelSubscriptionAtEndPeriod", {
    subscriptionId: subscriptionId,
  });

  return response.data;
}
