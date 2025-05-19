"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { AtSign, KeyRound, Loader2 } from "lucide-react"

import { AuthLayout } from "../_layout/auth-layout"
import { PasswordInput } from "@/components/password-input"
import { FormError } from "@/app/components/formErros"
import { loginSchema, type LoginFormValues } from "@/app/utils/validations"
import { formatErrorMessage } from "@/app/utils/masks"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        try {
            setIsLoading(true)
            setError(null)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // For demo purposes, we'll just redirect to dashboard
            // In a real app, you would call your authentication API
            console.log("Login data:", data)

            router.push("/dashboard")
        } catch (err) {
            setError(formatErrorMessage(err))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthLayout>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-medium tracking-tight">Acesse sua conta</h1>
                        <p className="text-sm text-muted-foreground">Entre com seu email e senha para acessar o sistema</p>
                    </div>

                    {error && <FormError message={error} />}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    <AtSign className="h-5 w-5" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    className={`auth-input w-full pl-10 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                    disabled={isLoading}
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Senha
                                </label>
                                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                    Esqueceu sua senha?
                                </Link>
                            </div>
                            <PasswordInput
                                id="password"
                                placeholder="••••••••"
                                icon={<KeyRound className="h-5 w-5" />}
                                error={errors.password?.message}
                                disabled={isLoading}
                                {...register("password")}
                            />
                            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                        </div>

                        <button type="submit" className="auth-button-primary w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </form>

                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <span className="relative bg-background px-2 text-xs text-muted-foreground">Ou continue com</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <button className="auth-button-outline">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                                <path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        Não tem uma conta?{" "}
                        <Link href="/register" className="text-primary hover:underline">
                            Criar conta
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AuthLayout>
    )
}
