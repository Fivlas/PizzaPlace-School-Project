import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import Image from "next/image";

const SpecialPizza = () => {
    return (
        <Card>
            <CardHeader>
                <Image src="/pizza.png" alt="Pizza" width={400} height={500} className="w-full h-48 object-fill rounded-2xl"/>
            </CardHeader>
            <CardContent>
                <CardTitle>Margherita Classica</CardTitle>
                <CardDescription>Fresh basil, mozzarella, tomatoes</CardDescription>
            </CardContent>
        </Card>
    );
};

const Specials = () => {
    return (
        <div className="py-20">
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Our Signature Pizzas
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SpecialPizza />
                <SpecialPizza />
                <SpecialPizza />
            </div>
        </div>
    );
};

export default Specials;
