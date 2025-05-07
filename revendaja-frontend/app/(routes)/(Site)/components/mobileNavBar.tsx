import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className=" bg-gray-950 text-gray-100">
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
     
    </div>
  )
}
