import { backend } from "@/api/backend";

export async function SoftDelete(productId: string) {
    const response = await backend.put('/stock/DisabledProduct', {
        productId
    })

    return response;

}