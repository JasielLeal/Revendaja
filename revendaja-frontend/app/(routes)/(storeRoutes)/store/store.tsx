'use client'

import { ActivesPromotions } from "./components/activesPromotions";
import { BestSellingProducts } from "./components/bestSellingProducts";

export function Store() {

    return (
        <div className="bg-[#FEFEFE] h-screen">  
            <ActivesPromotions />
            <BestSellingProducts />
        </div>
    );
}