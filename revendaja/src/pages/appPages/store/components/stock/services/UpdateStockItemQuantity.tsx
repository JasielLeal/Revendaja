import { backend } from "@/api/backend";

export async function UpdateStockItemQuantity(data: { productId: string; quantity: number | undefined }) {
    
    const response = await backend.put('/stock/UpdateStockItemQuantity', {
        stockId: data.productId,
        quantity: data.quantity,
    });

    return response;
}
