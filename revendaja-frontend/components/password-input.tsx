"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode
    error?: string
}

export function PasswordInput({ className, icon, error, ...props }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative">
            {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}

            <input
                type={showPassword ? "text" : "password"}
                className={cn(
                    "auth-input w-full",
                    icon && "pl-10",
                    error && "border-destructive focus-visible:ring-destructive",
                    className,
                )}
                {...props}
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
            </button>
        </div>
    )
}
