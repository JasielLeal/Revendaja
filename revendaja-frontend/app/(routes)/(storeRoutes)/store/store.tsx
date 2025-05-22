'use client'

import { ActivesPromotions } from "./components/activesPromotions";
import { BestSellingProducts } from "./components/bestSellingProducts";

export function Store() {

    return (
        <div className="bg-[#FEFEFE] flex-1">  
            <ActivesPromotions />
            <BestSellingProducts />
        </div>
    );
}