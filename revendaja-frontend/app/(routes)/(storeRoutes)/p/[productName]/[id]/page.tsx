'use client';

import { useQuery } from "@tanstack/react-query";
import { FindProductInStock } from "./services/findProductInStock";
import * as React from 'react';
import Image from "next/image";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { Button } from "@/components/ui/button";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useDomain } from "@/app/context/DomainContext";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const { storeData } = useDomain();

    const { data } = useQuery({
        queryKey: ["findProductInStock", id],
        queryFn: () => {
            if (String(storeData?.subdomain)) {
                return FindProductInStock(String(storeData?.subdomain), id);
            }
            return null;
        },
        enabled: !!String(storeData?.subdomain),
    });

    const product = data?.data?.product;
    const discountPercentage = calculatePercentage(
        Number(data?.data?.discountValue),
        Number(data?.data?.customPrice)
    );

    const router = useRouter();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                quantity: 1,
                imgUrl: product.imgUrl,
                name: product.name,
                value: data?.data?.customPrice,
                quantityInStock: product.quantity || data?.data?.quantity,
            });
            router.push('/cart');
        }
    };

    if (!product) return null;

    function OriginalCustomValue(numberOne: number, numberTwo: number) {
        return Number(numberOne) + Number(numberTwo);
    }

    return (
        <div className="bg-[#FEFEFE] h-screen">
            <div className="pt-7 px-5 max-w-5xl mx-auto ">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Imagem */}
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            {data?.data?.discountValue !== null && (
                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
                                    {discountPercentage.toFixed(0)}% OFF
                                </div>
                            )}
                            <div className="flex items-center justify-center w-full">
                                <Image
                                    src={product?.imgUrl}
                                    alt={product?.name}
                                    className="rounded-xl object-contain"
                                    priority
                                    width={500}
                                    height={500}
                                    layout="responsive"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Informações */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between">
                        <div>
                            <p className="text-xs text-gray-400">{product?.brand}</p>
                            <p className="font-semibold text-lg md:text-xl text-text line-clamp-2 mt-1">{product?.name}</p>

                            <p className="text-sm text-text font-medium mt-3">
                                Estoque disponível:
                                <span className="text-text font-semibold ml-1">
                                    {product.quantity || data?.data?.quantity}
                                </span>
                            </p>

                            <div className="flex items-center justify-between mt-4">
                                {data?.data?.discountValue ? (
                                    <div>
                                        <p className="line-through text-xs text-gray-500">
                                            R$ {formatCurrency(String(OriginalCustomValue(data?.data?.discountValue, data?.data?.customPrice)))}
                                        </p>
                                        <p className="font-semibold text-xl text-text">
                                            R$ {formatCurrency(String(data?.data?.customPrice))}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="line-through text-xs text-gray-500">
                                            R$ {formatCurrency(String(product?.normalPrice))}
                                        </p>
                                        <p className="font-semibold text-xl text-text">
                                            R$ {formatCurrency(String(data?.data?.customPrice))}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            className="w-full mt-5 md:mt-10"
                            onClick={handleAddToCart}
                            disabled={(data?.data?.quantity ?? 0) <= 0}
                        >
                            {(data?.data?.quantity ?? 0) > 0 ? 'Adicionar ao carrinho' : 'Sem estoque'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
