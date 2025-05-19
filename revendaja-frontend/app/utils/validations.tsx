import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

export const registerSchema = z
    .object({
        name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
        email: z.string().email("Email inválido"),
        phone: z.string().min(14, "Telefone inválido"),
        password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
            .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número")
            .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
        confirmPassword: z.string(),
        terms: z.literal(true, {
            errorMap: () => ({ message: "Você deve aceitar os termos de uso" }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    })

export const forgotPasswordSchema = z.object({
    email: z.string().email("Email inválido"),
})

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
            .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número")
            .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    })

export const verifyEmailSchema = z.object({
    code: z.string().length(6, "O código deve ter 6 dígitos"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>
