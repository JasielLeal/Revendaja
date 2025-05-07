
import { Beneficios } from "./components/beneficios";
import { CTA } from "./components/cta";
import { Faq } from "./components/faq";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import Home from "./components/mobileNavBar";
import { Plans } from "./components/plans";

export function Site() {
    return (
        <>

            <Home />
            <Hero />
            <Beneficios />
            <Features />
            <Plans />
            <Faq />
            <CTA />
            <Footer />
        </>
    )
}