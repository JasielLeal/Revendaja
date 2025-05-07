import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CheckCircle, CreditCard, FileText, Package, ShoppingBag } from "lucide-react";

export function Features() {
  return (
    <>
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
                    Mantenha o controle total do seu estoque, com adição de promoções que refletem diretamente no seu site e muito mais.
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
                    Acesse relatórios completos sobre suas vendas, produtos mais vendidos e muito
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
    </>
  )
}