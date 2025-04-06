"use client";

import { Pizza, useOrderStore } from "@/store/useOrderStore";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect } from "react";
import NumberFlow from "@number-flow/react";
import Summary from "@/components/order/Summary";
import PizzaCard from "@/components/order/PizzaCard";
import SizeCard from "@/components/order/SizeCard";
import ToppingsCard from "@/components/order/ToppingsCard";

const pizzas: Pizza[] = [
    {
        id: 1,
        name: "Groovy Margherita",
        price: 9.99,
        description:
            "Fresh basil, whole milk mozzarella, vine-ripened tomatoes",
    },
    {
        id: 2,
        name: "Disco Inferno",
        price: 12.49,
        description: "Spicy pepperoni, jalapeños, red sauce",
    },
    {
        id: 3,
        name: "Funky Fungi",
        price: 11.75,
        description: "Sautéed mushrooms, garlic butter base, smoked provolone",
    },
    {
        id: 4,
        name: "Hippie Supreme",
        price: 13.25,
        description: "Bell peppers, olives, onions, spinach, and artichokes",
    },
];

const sizes = [
    { id: 1, name: "Small", price: 0.0 },
    { id: 2, name: "Medium", price: 2.5 },
    { id: 3, name: "Large", price: 4.0 },
    { id: 4, name: "Extra Large", price: 6.0 },
];

const toppings = [
    { id: 1, name: "Ananas", price: 1.5, image: "/pinapple.jpeg" },
    { id: 2, name: "Onions", price: 1.0, image: "/onions.jpeg" },
    { id: 3, name: "Olives", price: 1.5, image: "/olives.jpeg" },
    { id: 4, name: "Beacon", price: 1.25, image: "/beacon.jpeg" },
];

const OrderPage = () => {
    const {
        selectedPizza,
        selectedSize,
        selectedToppings,
        setSelectedPizza,
        setSelectedSize,
        handleToppingChange,
        addToOrder,
    } = useOrderStore();

    useEffect(() => {
        if (selectedPizza && !selectedSize) {
            setSelectedSize(sizes[0]);
        }
    }, [selectedPizza, selectedSize, setSelectedSize]);

    return (
        <div className="container mx-auto px-2 md:px-6 mt-6">
            <div className="flex flex-col md:flex-row items-start gap-6 mt-4 ">
                <div className="w-full md:w-2/3 md:pr-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold text-[#e74a27] font-[Shrikhand] decoration-wavy underline underline-offset-4">
                                Order
                            </h1>
                            <p className="text-sm text-gray-500">
                                Order your favorite pizza from our menu.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pizzas.map((pizza, index) => (
                                <PizzaCard key={index} pizza={pizza} selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} />
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="font-medium mb-2 leading-tight text-[#e74a27] font-[Shrikhand] decoration-wavy underline underline-offset-4">
                                Choose your size
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {sizes.map((size) => (
                                    <SizeCard key={size.id} size={size} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                                ))}
                            </div>
                        </div>

                        <div className="font-medium mb-2 leading-tight text-[#e74a27] font-[Shrikhand] decoration-wavy underline underline-offset-4">
                            Additional Toppings
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {toppings.map((topping) => (
                                <ToppingsCard key={topping.id} topping={topping} handleToppingChange={handleToppingChange} selectedToppings={selectedToppings} />
                            ))}
                        </div>

                        <Button
                            className="mt-4 w-full"
                            onClick={() => addToOrder(toppings)}
                            disabled={!selectedPizza || !selectedSize}
                        >
                            Add to Order
                        </Button>
                    </div>
                </div>

                <div className="w-full md:w-1/3 mt-6 md:mt-0 md:sticky md:top-6">
                    <Summary/>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
