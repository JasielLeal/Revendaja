import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormErrorProps {
    message?: string
    className?: string
}

export function FormError({ message, className }: FormErrorProps) {
    if (!message) return null

    return (
        <div
            className={cn(
                "flex items-center gap-2 rounded-md bg-destructive/10 p-2 text-sm text-destructive animate-shake",
                className,
            )}
        >
            <AlertCircle className="h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}
