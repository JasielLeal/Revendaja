import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function maskPhone(value: string) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})(\d+?)$/, "$1")
}

export function formatErrorMessage(error: unknown): string {
    if (typeof error === "string") return error
    if (error instanceof Error) return error.message
    return "Ocorreu um erro inesperado"
}

export function getEmailMask(email: string): string {
    if (!email) return ""
    const [username, domain] = email.split("@")
    if (!username || !domain) return email

    const maskedUsername =
        username.charAt(0) +
        "*".repeat(Math.max(1, username.length - 2)) +
        (username.length > 1 ? username.charAt(username.length - 1) : "")

    return `${maskedUsername}@${domain}`
}
