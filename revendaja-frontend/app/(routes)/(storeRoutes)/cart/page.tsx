'use client'

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SalePendingSchema } from "./schemas/SalePendingSchema";
import { useState } from "react";
import { CreateSalePeding } from "./services/CreateSalePending";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDomain } from "@/app/context/DomainContext";
import { IoTrash } from "react-icons/io5";
import { phoneNumberMaskDynamic } from "@/app/utils/phoneNumberMaskDynamic";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { CustomSelect } from "@/app/components/select";


export default function Cart() {

    interface Product {
        id: string;
        name: string
        imgUrl: string;
        value: string
        quantity: number;
    }

    const { cart, addToCart, removeFromCart, updateUserInfo } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('')

    const router = useRouter();

    const handleIncrement = (product: Product) => {
        addToCart({ ...product, quantity: 1 });
    };

    const handleDecrement = (product: Product) => {

        if (product.quantity > 1) {
            addToCart({ ...product, quantity: -1 });
        }
    };

    const totalValueOfTheProduct = (productValue: string, quantityProduct: string) => {
        const valueTotal = Number(productValue) * Number(quantityProduct)

        return valueTotal
    }

    const totalCartValue = cart.products.reduce((total, item) => {
        return total + totalValueOfTheProduct(item.value, String(item.quantity));
    }, 0);

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(SalePendingSchema),
        mode: 'onSubmit',
        criteriaMode: 'all',
    });

    const { storeData } = useDomain()

    const { mutateAsync: createSalePedingFn, isPending } = useMutation({
        mutationFn: CreateSalePeding,
        onSuccess: (response) => {
            router.push(`/congratulations?id=${response.id}&value=${response.totalPrice}&store=${storeData?.name}&client=${response.customer}`);
        },
        onError: () => {

        }
    })

    async function onSub(data: FieldValues) {
        // Atualiza o nome e telefone do cliente no carrinho antes de criar a venda
        updateUserInfo(data.customer, data.numberPhone);

        // Mapeia os itens do carrinho para o formato necessário
        const items = cart.products.map(item => ({
            id: item.id,
            quantity: item.quantity,
        }));

        // Monta o objeto da nova venda
        const newData = {
            subdomain: storeData?.subdomain,
            customer: data.customer,
            numberPhone: data.numberPhone,
            transactionType: paymentMethod,
            items,
        };

        console.log(newData);

        // Chama a função de criação da venda
        await createSalePedingFn(newData);
    }


    console.log(cart)

    return (
        <div className="px-4 pt-5 h-screen bg-[#FEFEFE] ">
            <h1 className="font-semibold text-text">Meu carrinho</h1>

            {
                cart.products.length <= 0 ?

                    <div className="flex flex-col items-center justify-center py-10">
                        <p className="text-center text-gray-500 text-xl">
                            Opa, carrinho vazio :(
                        </p>
                        <p className="text-center text-gray-500 text-sm">
                            Adicione produtos para pode vizualizalos aqui
                        </p>
                    </div>

                    :

                    <>
                        {
                            cart.products.map((item) => (
                                <div className="flex gap-4 items-center mt-5" key={item.id}>
                                    <Image src={item.imgUrl} alt="imagem do produto" width={80} height={80} className="rounded-xl" />
                                    <div className="w-full">
                                        <p className="text-gray-600 font-medium text-sm">{item.name}</p>
                                        <p className="text-text font-semibold">R$ {formatCurrency(String(totalValueOfTheProduct(item.value, String(item.quantity))))}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => handleDecrement(item)}
                                                    className="h-8 w-8 bg-gray-300 rounded-md"
                                                    disabled={item.quantity === 1}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    readOnly
                                                    className="w-8 text-center border-t border-b  h-8 rounded-md"
                                                />
                                                <button
                                                    onClick={() => handleIncrement(item)}
                                                    className="h-8 w-8 bg-gray-300 rounded-md"
                                                    disabled={item.quantity === item.quantityInStock}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div>
                                                <button className="text-red-500" onClick={() => removeFromCart(item.id)}>
                                                    <IoTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        < Separator className="my-5" />

                        <div className="flex items-center justify-between w-full">
                            <p className="font-semibold text-text">Valor total</p>
                            <p className="text-text">R$ {formatCurrency(String(totalCartValue))}</p>
                        </div>

                        <form onSubmit={handleSubmit(onSub)}>
                            <div className="mt-3">
                                <p className="text-gray-600 font-medium text-sm mb-1">Seu nome</p>
                                <Input placeholder="Insira seu nome" className="mb-3 text-gray-900 bg-white border border-gray-200 placeholder:text-gray-900" {...register("customer")} />

                                <p className="text-text font-medium text-sm mb-1">Seu celular</p>
                                <Input
                                    placeholder="Insira seu celular"
                                    className="mb-3 bg-white border border-gray-200 placeholder:text-gray-900 text-gray-900"
                                    {...register("numberPhone", {
                                        onChange: (e) => {
                                            e.target.value = phoneNumberMaskDynamic(e.target.value);
                                        }
                                    })}

                                />

                                <p className="text-text font-medium text-sm mb-1">Metodo de pagamento</p>

                                <CustomSelect
                                    placeholder="Selecione o método de pagamento"
                                    value={paymentMethod}
                                    onValueChange={setPaymentMethod}
                                    options={[
                                        { label: 'Pix', value: 'Pix' },
                                        { label: 'Cartão', value: 'Cartão' },
                                        { label: 'Dinheiro', value: 'Dinheiro' },
                                    ]}
                                />
                            </div>

                            {
                                isPending ?
                                    <Button className="w-full my-5" disabled>
                                        <LoadingSpinner />
                                    </Button>
                                    :
                                    <Button className="w-full my-5">Finalizar Compra</Button>
                            }
                        </form>




                    </>

            }
        </div>
    )
}