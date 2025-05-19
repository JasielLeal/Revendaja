import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BoxIcon as Bottle, Menu } from "lucide-react"

interface AuthLayoutProps {
    children: ReactNode
    showIllustration?: boolean
    className?: string
}

export function AuthLayout({ children, showIllustration = true, className }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full  dark:bg-gray-950">
            <header className="container flex items-center justify-between py-4">
                <Link href="/" className="flex items-center gap-2">
                    <Bottle className="h-6 w-6 text-primary" />
                    <span className="text-lg font-medium">PerfumeSystem</span>
                </Link>
                <div className="flex items-center gap-4">
                    <button className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            <main className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-8">
                <div
                    className={cn(
                        "grid w-full max-w-6xl animate-fade-in gap-8",
                        showIllustration ? "grid-cols-1 lg:grid-cols-2" : "",
                        className,
                    )}
                >
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md animate-slide-up rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
                            {children}
                        </div>
                    </div>

                    {showIllustration && (
                        <div className="hidden items-center justify-center lg:flex">
                            <div className="relative h-[400px] w-[400px]">
                                <Image
                                    src="/placeholder.svg?height=400&width=400"
                                    alt="Ilustração"
                                    width={400}
                                    height={400}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="container py-4 text-center text-sm text-muted-foreground">
                <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
                    <span>© 2024 PerfumeSystem. Todos os direitos reservados.</span>
                    <div className="flex gap-4 md:ml-4">
                        <Link href="/terms" className="hover:text-primary hover:underline">
                            Termos de Uso
                        </Link>
                        <Link href="/privacy" className="hover:text-primary hover:underline">
                            Política de Privacidade
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
