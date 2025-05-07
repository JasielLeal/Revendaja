import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Faq() {
    return (
        <>
            {/* FAQ Section */}
            <section className="container mx-auto py-16 px-4 md:px-6 border-t border-gray-800">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Tire suas dúvidas sobre a plataforma Revendaja.</p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-gray-800">
                            <AccordionTrigger className="text-left">Como funciona o plano gratuito?</AccordionTrigger>
                            <AccordionContent className="text-gray-400">
                                O plano gratuito da Revendaja oferece acesso a funcionalidades básicas como cadastro de até 50
                                produtos, controle simples de estoque, catálogo digital e relatórios básicos. Não há período de teste,
                                você pode usar o plano gratuito por tempo indeterminado.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-gray-800">
                            <AccordionTrigger className="text-left">
                                Posso migrar do plano gratuito para o pago depois?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400">
                                Sim! Você pode fazer upgrade para qualquer plano pago a qualquer momento. Todos os seus dados serão
                                mantidos e você terá acesso imediato às funcionalidades adicionais do plano escolhido.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-gray-800">
                            <AccordionTrigger className="text-left">
                                A Revendaja funciona com quais marcas de cosméticos?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400">
                                A Revendaja é compatível com qualquer marca de cosméticos. Temos parcerias com Natura, O Boticário,
                                Avon e Eudora, o que facilita a importação de catálogos, mas você pode cadastrar produtos de qualquer
                                marca manualmente.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="border-gray-800">
                            <AccordionTrigger className="text-left">Como funciona a loja virtual personalizada?</AccordionTrigger>
                            <AccordionContent className="text-gray-400">
                                Com os planos pagos, você tem acesso a uma loja virtual personalizada com seu nome e logo. Você recebe
                                um link único que pode compartilhar com seus clientes via WhatsApp, redes sociais ou e-mail. Os
                                clientes podem navegar pelo seu catálogo e fazer pedidos diretamente pela loja.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="border-gray-800">
                            <AccordionTrigger className="text-left">
                                Qual a diferença entre os planos Starter e Exclusive?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400">
                                O plano Starter oferece recursos essenciais para revendedores em crescimento, como produtos
                                ilimitados, controle avançado de estoque e loja virtual personalizada. Já o plano Exclusive inclui
                                tudo do Starter e adiciona recursos avançados como múltiplos usuários, integração com marketplaces,
                                automação de marketing e suporte VIP 24/7, ideal para revendedores que desejam escalar seu negócio.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </>
    )
}