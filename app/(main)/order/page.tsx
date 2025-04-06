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
import { useRouter } from "next/navigation";
import Summary from "@/components/order/Summary";


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
                            {pizzas.map((pizza) => (
                                <Card
                                    key={pizza.id}
                                    className={`cursor-pointer transition-all ${selectedPizza?.id === pizza.id
                                            ? "ring-2 ring-primary"
                                            : ""
                                        }`}
                                    onClick={() => setSelectedPizza(pizza)}
                                >
                                    <CardContent>
                                        <CardTitle>{pizza.name}</CardTitle>
                                        <CardDescription>
                                            {pizza.description}
                                        </CardDescription>
                                        <div className="mt-2 font-semibold">
                                            <NumberFlow
                                                value={pizza.price}
                                                format={{
                                                    style: "currency",
                                                    currencyDisplay:
                                                        "narrowSymbol",
                                                    currency: "USD",
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="font-medium mb-2 leading-tight text-[#e74a27] font-[Shrikhand] decoration-wavy underline underline-offset-4">
                                Choose your size
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {sizes.map((size) => (
                                    <Card
                                        key={size.id}
                                        className={`cursor-pointer transition-all ${selectedSize?.id === size.id
                                                ? "ring-2 ring-primary"
                                                : ""
                                            }`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        <CardContent>
                                            <CardTitle>{size.name}</CardTitle>
                                            <div className="mt-1">
                                                {size.price > 0 ? (
                                                    <NumberFlow
                                                        value={size.price}
                                                        format={{
                                                            style: "currency",
                                                            currencyDisplay:
                                                                "narrowSymbol",
                                                            currency: "USD",
                                                        }}
                                                    />
                                                ) : (
                                                    <span>Included</span>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="font-medium mb-2 leading-tight text-[#e74a27] font-[Shrikhand] decoration-wavy underline underline-offset-4">
                            Additional Toppings
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {toppings.map((topping) => (
                                <Card key={topping.id} className="w-full">
                                    <CardContent className="flex items-center gap-2 justify-between">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={topping.image}
                                                alt={topping.name}
                                                width={50}
                                                height={50}
                                                className="rounded-2xl"
                                            />
                                            <div className="flex flex-col">
                                                <CardTitle>
                                                    {topping.name}
                                                </CardTitle>
                                                <CardDescription>
                                                    <NumberFlow
                                                        value={topping.price}
                                                        format={{
                                                            style: "currency",
                                                            currencyDisplay:
                                                                "narrowSymbol",
                                                            currency: "USD",
                                                        }}
                                                    />
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handleToppingChange(
                                                        topping.id,
                                                        1
                                                    )
                                                }
                                            >
                                                +
                                            </Button>
                                            {selectedToppings[topping.id] || 0}
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handleToppingChange(
                                                        topping.id,
                                                        -1
                                                    )
                                                }
                                                disabled={
                                                    !selectedToppings[
                                                    topping.id
                                                    ]
                                                }
                                            >
                                                -
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
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
