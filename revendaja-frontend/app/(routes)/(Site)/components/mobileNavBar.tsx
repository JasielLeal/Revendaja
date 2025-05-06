import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Clock, AlertCircle, ShoppingBag, BarChart3, CreditCard, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Marquee from "react-fast-marquee"
import Image from "next/image"
import natura from "@/app/assets/natura.svg"
import oboticario from "@/app/assets/boticario.png"
import eudora from "@/app/assets/eudora.png"
import avon from "@/app/assets/avon.png"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-gray-950/80 py-4 px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-primary px-3  rounded-md text-[20px]">r</span>
            <span className="text-[20px] font-semibold">revendaja</span>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            <Link href="#" className="text-sm hover:text-orange-400 transition-colors">
              Home
            </Link>
            <Link href="#diferenciais" className="text-sm hover:text-orange-400 transition-colors">
              Diferenciais
            </Link>
            <Link href="#funcionalidades" className="text-sm hover:text-orange-400 transition-colors">
              Funcionalidades
            </Link>
            <Link href="#planos" className="text-sm hover:text-orange-400 transition-colors">
              Planos
            </Link>
          </nav>
          <Button
            className="hidden md:flex border-orange-500 text-white hover:bg-orange-500 hover:text-white rounded-xl px-10"
          >
           Começar Agora
          </Button>

        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto py-16 px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant={'outline'} >

              Plataforma para <span className="text-primary mx-1">revendedores </span>

            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-6">
              Simplificando a vida dos vendedores de cosméticos
            </h1>
            <p className="text-gray-400 text-sm md:text-lg mb-8">
              Gerencie suas vendas, estoque e catálogo em um só lugar. A plataforma completa para revendedores de
              produtos de beleza.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                Começar a vender agora
              </Button>
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10 rounded-xl">
                Saiba mais
              </Button>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section>
          <Marquee>
            <div className="flex items-center justify-center gap-20 py-4">
              <Image src={natura} alt="logo da natura" width={150} />
              <Image src={oboticario} alt="logo do oboticário" width={150} />
              <Image src={eudora} alt="logo da eudora" width={150} />
              <Image src={avon} alt="logo da avon" width={150} className="mr-20" />
            </div>
          </Marquee>
        </section>



        {/* Benefits Section */}
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

        {/* Features Section */}
        <section id="funcionalidades" className="container mx-auto py-16 px-4 md:px-6 border-t border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que temos a oferecer?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Conheça as principais funcionalidades da Revendaja para impulsionar seu negócio.
            </p>
          </div>
          <Tabs defaultValue="estoque" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-32 bg-gray-900">
              <TabsTrigger value="estoque" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Estoque
              </TabsTrigger>
              <TabsTrigger
                value="financeiro"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Financeiro
              </TabsTrigger>
              <TabsTrigger value="loja" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Loja
              </TabsTrigger>
              <TabsTrigger value="boletos" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Boletos
              </TabsTrigger>
              <TabsTrigger
                value="relatorio"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Relatório
              </TabsTrigger>
            </TabsList>
            <div className="bg-gray-900 p-6 rounded-lg">
              <TabsContent value="estoque" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Controle de Estoque Inteligente</h3>
                    <p className="text-gray-400 mb-6">
                      Mantenha o controle total do seu estoque com alertas de produtos com baixa quantidade, datas de
                      validade e muito mais.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Alertas de estoque baixo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Controle de validade</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Histórico de movimentações</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg h-64 flex items-center justify-center">
                    <Package className="h-16 w-16 text-orange-500" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="financeiro" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Gestão Financeira Completa</h3>
                    <p className="text-gray-400 mb-6">
                      Acompanhe suas receitas, despesas, lucros e comissões em um só lugar, com relatórios detalhados e
                      gráficos intuitivos.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Controle de receitas e despesas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Cálculo automático de lucros</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Gestão de comissões</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg h-64 flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-orange-500" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="loja" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Loja Virtual Personalizada</h3>
                    <p className="text-gray-400 mb-6">
                      Crie sua própria loja virtual para vender seus produtos online, com catálogo digital e
                      compartilhamento fácil.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Catálogo digital</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Link personalizado</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Compartilhamento via WhatsApp</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg h-64 flex items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-orange-500" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="boletos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Gestão de Boletos e Pagamentos</h3>
                    <p className="text-gray-400 mb-6">
                      Controle todos os seus boletos e pagamentos, com lembretes automáticos de vencimento e histórico
                      completo.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Lembretes de vencimento</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Histórico de pagamentos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Organização por ciclos</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg h-64 flex items-center justify-center">
                    <CreditCard className="h-16 w-16 text-orange-500" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="relatorio" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Relatórios Detalhados</h3>
                    <p className="text-gray-400 mb-6">
                      Acesse relatórios completos sobre suas vendas, produtos mais vendidos, clientes fiéis e muito
                      mais.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Produtos mais vendidos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Análise de lucratividade</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Histórico de clientes</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg h-64 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-orange-500" />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </section>

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

        {/* CTA Section */}
        <section className="container mx-auto py-16 px-4 md:px-6 border-t border-gray-800">
          <div className="bg-gradient-to-r from-orange-900 to-orange-800 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para revolucionar suas vendas?</h2>
            <p className="text-gray-200 max-w-2xl mx-auto mb-8">
              Junte-se a milhares de revendedores que já estão aumentando suas vendas e organizando seu negócio com a
              Revendaja.
            </p>
            <Button size="lg" className="bg-white text-orange-900 hover:bg-gray-100">
              Começar gratuitamente
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contato" className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-primary px-3  rounded-md text-[20px]">r</span>
                <span className="text-[20px] font-semibold">revendaja</span>
              </div>
              <p className="text-gray-400">
                A plataforma completa para revendedores de cosméticos gerenciarem suas vendas, estoque e catálogo em um
                só lugar.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-orange-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-orange-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-orange-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-400">
                    Controle de Estoque
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-400">
                    Gestão Financeira
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-400">
                    Loja Virtual
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-400">
                    Relatórios
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-400">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-400">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-400">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-gray-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-gray-400">() 99209-2241</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-gray-400"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="text-gray-400">contato@revendaja.com.br</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Revendaja. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
