import { backend } from "@/api/backend";

interface productsPropsRequest {
    barcode: string
    customPrice: string
    normalPrice: string
    suggestedPrice: string
    quantity: Number
}

export async function InsertProductToStock({ barcode, customPrice, quantity, normalPrice, suggestedPrice }: productsPropsRequest) {
    
    const formattedPrice = customPrice.replace(/,/g, '');

    const response = await backend.post('/stock/create', {
        barcode,
        customPrice: formattedPrice,
        suggestedPrice,
        normalPrice,
        quantity, 
    })

    return response
}