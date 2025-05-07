import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Update the import path to the correct location of the Badge component
import Marquee from "react-fast-marquee"
import Image from "next/image"
import natura from "@/app/assets/natura.svg"
import oboticario from "@/app/assets/boticario.png"
import eudora from "@/app/assets/eudora.png"
import avon from "@/app/assets/avon.png"

export function Hero() {
    // Hero Section
    return (
        <div className="container mx-auto py-16 px-4 md:px-6 mt-24" >
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
        </div>
    )
}