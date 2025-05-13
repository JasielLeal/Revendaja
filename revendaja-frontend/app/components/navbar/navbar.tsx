'use client'

import { useDomain } from "@/app/context/DomainContext";
import { MobileNavBar } from "./components/mobileNavBar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoBagHandleOutline } from "react-icons/io5";
import { useCart } from "@/app/context/CartContext";

export function Navbar() {
    const { storeData } = useDomain();
    const { cart } = useCart();

    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && search.trim() !== '') {
            router.push(`/search?query=${encodeURIComponent(search.trim())}`);
            setSearch('');
        }
    };

    const cartItemCount = cart.products.reduce((total, item) => total + item.quantity, 0);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Promoções", href: "/boletos" },
        { label: "Kits", href: "/loja" },
        { label: "Masculino", href: "/financeiro" },
        { label: "Feminino", href: "/ajuda" },
        { label: "Perfumes", href: "/planos" },
    ];

    return (
        <header className="bg-[#FEFEFE] px-4 py-4 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center justify-between w-full md:w-auto">
                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <MobileNavBar />
                    </div>

                    {/* Nome da Loja */}
                    <Link
                        href="/"
                        className="text-text font-semibold text-base md:text-lg"
                    >
                        {storeData?.name}
                    </Link>

                    {/* Carrinho */}
                    <div className="relative bg-input p-2 rounded-xl shrink-0 md:hidden">
                        <Link href="/cart" className="text-text">
                            <IoBagHandleOutline size={20} />
                        </Link>
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {cartItemCount >= 9 ? "+9" : cartItemCount}
                            </span>
                        )}
                    </div>
                </div>

                {/* Links de navegação (Desktop only) */}
                <nav className="hidden md:flex gap-6 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors "
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Carrinho (Desktop only) */}
                <div className="hidden md:block relative bg-input p-2 rounded-xl shrink-0">
                    <Link href="/cart" className="text-text">
                        <IoBagHandleOutline size={20} />
                    </Link>
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {cartItemCount >= 9 ? "+9" : cartItemCount}
                        </span>
                    )}
                </div>
            </div>

            {/* Barra de busca */}
            <div className="max-w-6xl mx-auto mt-4">
                <Input
                    placeholder="Pesquisar..."
                    className="w-full placeholder:text-text text-text font-light"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
        </header>
    );
}
