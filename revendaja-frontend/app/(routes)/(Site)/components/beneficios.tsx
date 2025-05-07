import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export function Beneficios() {

    return (
        <div className="flex flex-col items-center pt-20 px-4">
            <section id="diferenciais" className="container mx-auto py-16 px-4 md:px-6 border-t border-gray-800">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Por que escolher a Revendaja?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Nossa plataforma foi desenvolvida pensando nas necessidades específicas de revendedores de cosméticos.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="pb-2">
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                            </div>
                            <CardTitle className="text-xl">Gratuito</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-gray-400">
                                Comece a usar sem custos. Nosso plano gratuito já oferece todas as funcionalidades essenciais para
                                você iniciar suas vendas.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="pb-2">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                                <Clock className="h-6 w-6 text-blue-500" />
                            </div>
                            <CardTitle className="text-xl">Economia de tempo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-gray-400">
                                Automatize processos repetitivos e ganhe mais tempo para focar no que realmente importa: suas vendas e
                                clientes.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="pb-2">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                                <AlertCircle className="h-6 w-6 text-red-500" />
                            </div>
                            <CardTitle className="text-xl">Redução de erros</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-gray-400">
                                Minimize erros de cálculo, controle de estoque e gestão financeira com nossa plataforma intuitiva e
                                precisa.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}