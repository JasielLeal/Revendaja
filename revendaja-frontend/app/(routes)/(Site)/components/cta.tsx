import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <>
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
        </>
    )
}