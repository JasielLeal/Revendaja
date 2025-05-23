'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import { DomainProvider, useDomain } from "./DomainContext";
import { CartProvider } from "./CartContext";
import { Navbar } from "../components/navbar/navbar";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const { isMainDomain } = useDomain(); // Use o contexto para verificar o domínio

    return (
        <>
            {!isMainDomain && <Navbar />}
            {children}
            {!isMainDomain}
        </>
    );
}

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: false,
                        staleTime: 1000 * 60 * 5,
                    },
                },
            })
    );

    return (

        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <DomainProvider>
                    <CartProvider>
                        <LayoutWrapper>
                                {children}
                        </LayoutWrapper>
                    </CartProvider>
                </DomainProvider>

            </AuthProvider>
        </QueryClientProvider >

    );
}
