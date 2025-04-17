import { backend } from "@/api/backend";

interface productsPropsRequest {
    barcode: string
    customPrice: string
    suggestedPrice: string
    normalPrice: string
    quantity: Number
}

export async function InsertProductToStock({ barcode, customPrice, suggestedPrice, normalPrice, quantity }: productsPropsRequest) {
    const response = await backend.post('/stock/create', {
        barcode,
        customPrice,
        suggestedPrice,
        normalPrice,
        quantity
    })

    return response
}