'use client'

import { ReactNode } from "react";
import * as React from "react"

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {


    return (
        <div className="grid grid-cols-12">
           
            <div className="col-span-10 bg-[#09090b] pt-10 px-10">
                {children}
            </div>

        </div>
    );
}
