import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function Plans() {
    return (
        <>
            {/* Pricing Section */}
            <section id="planos" className="container mx-auto py-16 px-4 md:px-6 border-t border-gray-800">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Planos que cabem no seu bolso</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Escolha o plano ideal para o seu negócio e comece a vender mais hoje mesmo.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-2xl">Free</CardTitle>
                            <CardDescription className="text-gray-400">Para quem está começando</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <span className="text-3xl font-bold">Gratuito</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Até 50 produtos</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Controle básico de estoque</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Catálogo digital simples</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Relatórios básicos</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-gray-800 hover:bg-gray-700">Começar agora</Button>
                        </CardFooter>
                    </Card>
                    <Card className="bg-gray-900 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            POPULAR
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl">Starter</CardTitle>
                            <CardDescription className="text-gray-300">Para revendedores em crescimento</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <span className="text-3xl font-bold">R$29,99</span>
                                <span className="text-gray-300">/mês</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                    <span>Produtos ilimitados</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                    <span>Controle avançado de estoque</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                    <span>Loja virtual personalizada</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                    <span>Relatórios avançados</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                    <span>Suporte prioritário</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Adquirir</Button>
                        </CardFooter>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-2xl">Exclusive</CardTitle>
                            <CardDescription className="text-gray-400">Para revendedores profissionais</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <span className="text-3xl font-bold">R$49,99</span>
                                <span className="text-gray-400">/mês</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Tudo do plano Starter</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Múltiplos usuários</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Integração com marketplaces</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Automação de marketing</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Suporte VIP 24/7</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant={'default'} className="w-full">Adquirir</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </>
    )
}