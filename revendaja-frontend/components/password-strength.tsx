"use client"

import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
    password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const getStrength = (password: string) => {
        let score = 0

        if (!password) return 0
        if (password.length >= 8) score += 1
        if (/[A-Z]/.test(password)) score += 1
        if (/[a-z]/.test(password)) score += 1
        if (/[0-9]/.test(password)) score += 1
        if (/[^A-Za-z0-9]/.test(password)) score += 1

        return score
    }

    const strength = getStrength(password)

    const getLabel = (strength: number) => {
        if (strength === 0) return "Muito fraca"
        if (strength === 1) return "Fraca"
        if (strength === 2) return "Média"
        if (strength === 3) return "Boa"
        if (strength === 4) return "Forte"
        return "Muito forte"
    }

    const getColor = (strength: number) => {
        if (strength === 0) return "bg-gray-200 dark:bg-gray-700"
        if (strength === 1) return "bg-red-500"
        if (strength === 2) return "bg-orange-500"
        if (strength === 3) return "bg-yellow-500"
        if (strength === 4) return "bg-green-500"
        return "bg-emerald-500"
    }

    return (
        <div className="space-y-2">
            <div className="flex h-1.5 w-full gap-1 rounded-full bg-gray-100 dark:bg-gray-800">
                {[1, 2, 3, 4, 5].map((index) => (
                    <div
                        key={index}
                        className={cn(
                            "h-full w-1/5 rounded-full transition-all duration-300",
                            index <= strength ? getColor(strength) : "bg-gray-200 dark:bg-gray-700",
                        )}
                    />
                ))}
            </div>
            {password && (
                <p className="text-xs text-muted-foreground">
                    Força da senha: <span className="font-medium">{getLabel(strength)}</span>
                </p>
            )}
        </div>
    )
}
