import Hero from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/pricing";
import Specials from "@/components/landing/Specials";
import { CTA } from "@/components/ui/call-to-action";
import { demoPlans } from "@/constants/landing";

export default function Home() {
    return (
        <div className="container mx-auto md:px-6">
            <Hero />
            <Specials />
            <Pricing
                plans={demoPlans}
                title="Pricing"
                description="Our sauce is priceless — but here’s the deal."
            />
            {/* Our Signature Pizzas */}
            {/* Card */}
            {/* Image */}
            {/* Name */}
            {/* Ingredients */}
            <CTA />
        </div>
    );
}
