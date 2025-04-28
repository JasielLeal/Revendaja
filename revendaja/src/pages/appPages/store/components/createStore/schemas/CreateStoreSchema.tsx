import { z } from "zod";

export const CreateStoreSchema = z.object({
    name: z.string(),
    description: z.string(),
    phone: z.string().refine((value) => {
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        return phoneRegex.test(value);
    }, {
        message: "Número de telefone inválido. Formato esperado: (XX) XXXXX-XXXX",
    }),
});
