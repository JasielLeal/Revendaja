import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateStoreSchema } from "../schemas/CreateStoreSchema";

export const CreateStoreForm = () => {

    type RegisterFormData = z.infer<typeof CreateStoreSchema>;

    const { control, handleSubmit, formState: { errors }, setValue, register, watch } = useForm<RegisterFormData>({
        resolver: zodResolver(CreateStoreSchema),
        mode: 'onSubmit',
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
    };

    return { control, handleSubmit, errors, onSubmit, setValue, register, watch };
}