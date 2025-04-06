import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import Image from "next/image";

const SpecialPizza = ({title, description} : {title: string, description: string}) => {
    return (
        <Card>
            <CardHeader>
                <Image src="/pizza.png" alt="Pizza" width={400} height={500} className="w-full h-48 object-fill rounded-2xl"/>
            </CardHeader>
            <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    );
};

const Specials = () => {
    return (
        <div id="specials" className="py-20">
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-[Shrikhand] text-[#e74a27] decoration-wavy underline underline-offset-15">
                    Our Pizzas
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SpecialPizza title="Groovy Margherita" description="Fresh basil, mozzarella, tomatoes"/>
                <SpecialPizza title="Disco Inferno" description="Spicy pepperoni, jalapeños, red sauce"/>
                <SpecialPizza title="Funky Fungi" description="Sautéed mushrooms, garlic butter base, smoked provolone"/>
            </div>
        </div>
    );
};

export default Specials;
