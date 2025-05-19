import { backend } from "@/api/backend";

export async function SoftDelete(productId: string) {
    const response = await backend.post('/stock/DisabledProduct', {
        productId
    })

    return response;

}