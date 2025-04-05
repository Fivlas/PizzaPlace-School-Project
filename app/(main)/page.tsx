import Hero from "@/components/landing/Hero";
import History from "@/components/landing/History";
import Specials from "@/components/landing/Specials";
import { CTA } from "@/components/ui/call-to-action";
import MapSection from "@/components/landing/MapSection";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
    return (
        <>
        <Navbar />
        <div className="container mx-auto px-2 md:px-6">
            <Hero />
            <Specials />
            <History/>
            <MapSection/>
            <CTA />
        </div>
        </>
    );
}
