import { backend } from "@/api/backend";
import { FieldValues } from "react-hook-form";

export async function CreateStoreFn(data: FieldValues) {

    const response = await backend.post("/store/create", {
        name: data.name,
        description: data.description,
        numberPhone: data.numberPhone
    });
    return response
}
