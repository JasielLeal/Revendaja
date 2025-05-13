'use client'

import { useDomain } from "@/app/context/DomainContext";
import { useQuery } from "@tanstack/react-query";
import { GetTheTopBestSellingProducts } from "../services/GetTheTopBestSellingProducts";
import Image from "next/image";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function BestSellingProducts() {
    const { storeData } = useDomain();
    const { data: ProductsOnPromotion } = useQuery({
        queryKey: ['GetTheTopBestSellingProducts', storeData?.subdomain],
        queryFn: () => GetTheTopBestSellingProducts(storeData?.subdomain),
        enabled: !!storeData?.subdomain,
    });

    type ProductProps = {
        id: number;
        normalPrice: string;
        customPrice: string;
        stock: {
            id: number;
            normalPrice: string;
            customPrice: string;
            discountValue: string;
            quantity: number;
            product: {
                id: number;
                name: string;
                brand: string;
                imgUrl: string;
                normalPrice: string;
            };
            customProduct: {
                id: number;
                name: string;
                brand: string;
                imgUrl: string;
                normalPrice: string;
            };
        };
    };

    const router = useRouter();

    const filteredProducts = ProductsOnPromotion?.filter(
        (item: ProductProps) => item.stock.quantity > 0
    );

    return (
        <section className="w-full px-4 mb-10">
            {filteredProducts?.length > 0 && (
                <>
                    <div className="flex items-center justify-between mb-4 mt-10">
                        <p className="text-text font-medium text-lg">Mais vendidos</p>
                        <Link href="/" className="text-subtext font-light text-sm">Ver todos</Link>
                    </div>

                    <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible no-scrollbar snap-x snap-mandatory scroll-smooth">
                        {filteredProducts.map((item: ProductProps) => {
                            const stock = item.stock;
                            const produto = stock.product || stock.customProduct;

                            const discountPercentage = stock.discountValue
                                ? calculatePercentage(Number(stock.normalPrice), Number(stock.customPrice))
                                : null;

                            return (
                                <div
                                    key={stock.id}
                                    onClick={() => router.push(`/p/${produto.name}/${produto.id}`)}
                                    className="flex flex-col justify-between w-[170px] md:w-full max-w-[200px] shrink-0 snap-start rounded-lg bg-input p-3 cursor-pointer hover:shadow-md transition-all duration-300"
                                >
                                    <div className="relative">
                                        {discountPercentage !== null && (
                                            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                                {discountPercentage.toFixed(0)}% OFF
                                            </div>
                                        )}
                                        <div className="flex items-center justify-center w-full">
                                            <Image
                                                src={produto.imgUrl || '/path/to/defaultImage.jpg'}
                                                alt={produto.name}
                                                className="mb-3 rounded-xl object-cover"
                                                width={170}
                                                height={170}
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400">{produto.brand}</p>
                                    <p className="font-semibold mb-2 text-text text-sm line-clamp-2">{produto.name}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div>
                                            <p className="line-through text-xs text-gray-500">
                                                R$ {formatCurrency(String(stock.normalPrice))}
                                            </p>
                                            <p className="font-semibold text-base text-text">
                                                R$ {formatCurrency(String(stock.customPrice))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </section>
    );
}
