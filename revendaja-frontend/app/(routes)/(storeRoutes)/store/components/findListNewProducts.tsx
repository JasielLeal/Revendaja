'use client'

import { useDomain } from "@/app/context/DomainContext";
import { useQuery } from "@tanstack/react-query";
import { FindNewProducts } from "../services/FindNewProducts";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import { Skeleton } from "@/components/ui/skeleton";

export function NewProductsList() {
    const { storeData } = useDomain();
    const router = useRouter();

    const { data: recommendedProducts, isLoading } = useQuery({
        queryKey: ["FindNewProducts", storeData?.subdomain],
        queryFn: () => FindNewProducts(storeData?.subdomain),
        enabled: !!storeData?.subdomain,
    });

    type Product = {
        id: number;
        normalPrice: string;
        customPrice: string;
        discountValue: string;
        quantity: number;
        product: ProductDetails;
        customProduct: ProductDetails;
    };

    type ProductDetails = {
        id: number;
        name: string;
        brand: string;
        imgUrl: string;
        normalPrice: string;
    };

    const renderPrice = (promotion: Product) => {
        const isDiscounted = promotion.discountValue && promotion.discountValue !== '0';
        const originalPrice = isDiscounted
            ? String(Number(promotion.discountValue) + Number(promotion.customPrice))
            : promotion.normalPrice;

        return (
            <div className="flex flex-col">
                <p className="line-through text-xs text-gray-500">
                    R$ {formatCurrency(String(originalPrice))}
                </p>
                <p className="font-semibold text-base text-text">
                    R$ {formatCurrency(String(promotion.customPrice))}
                </p>
            </div>
        );
    };

    const renderQuantity = (promotion: Product) => {
        return promotion.quantity === 0 ? (
            <p className="text-red-500 text-sm">Produto esgotado</p>
        ) : (
            renderPrice(promotion)
        );
    };

    return (
        <section className="bg-[#FEFEFE] w-full px-4 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between pb-4">
                    <p className="text-text font-medium text-lg">Produtos Recentes</p>
                </div>

                {isLoading ? (
                    <div className="flex gap-4 overflow-x-auto no-scrollbar">
                        {[...Array(3)].map((_, index) => (
                            <Skeleton key={index} className="w-[170px] h-[290px] rounded-xl shrink-0" />
                        ))}
                    </div>
                ) : (
                    <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-5 md:overflow-visible no-scrollbar snap-x snap-mandatory scroll-smooth">
                        {recommendedProducts?.map((promotion: Product) => {
                            const product = promotion.product || promotion.customProduct;
                            const discountPercentage = calculatePercentage(
                                Number(promotion.discountValue),
                                Number(promotion.customPrice)
                            );

                            return (
                                <div
                                    key={product.id}
                                    onClick={() => router.push(`/p/${product.name}/${product.id}`)}
                                    className="flex flex-col justify-between w-[170px] md:w-full max-w-[200px] shrink-0 snap-start rounded-lg bg-input p-3 cursor-pointer hover:shadow-md transition-all duration-300"
                                >
                                    <div>
                                        <div className="relative">
                                            {promotion.discountValue && (
                                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                                    {discountPercentage.toFixed(0)}% OFF
                                                </div>
                                            )}
                                            <div className="flex items-center justify-center w-full">
                                                <Image
                                                    src={product.imgUrl || '/path/to/defaultImage.jpg'}
                                                    alt={product.name}
                                                    className="mb-3 rounded-xl object-cover"
                                                    width={170}
                                                    height={170}
                                                    priority
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400">{product.brand}</p>
                                        <p className="font-semibold mb-2 text-text text-sm line-clamp-2">
                                            {product.name}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        {renderQuantity(promotion)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
