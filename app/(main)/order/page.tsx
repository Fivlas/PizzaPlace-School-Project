import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const page = () => {
    return (
        <div className="container mx-auto flex items-centerpx-2 md:px-6 mt-6">
            <div className="w-2/3 pr-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Order</h1>
                        <p className="text-sm text-gray-500">
                            Order your favorite pizza from our menu.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card>
                            <CardContent>
                                <CardTitle>Margherita Classica</CardTitle>
                                <CardDescription>
                                    Fresh basil, mozzarella, tomatoes
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <CardTitle>Margherita Classica</CardTitle>
                                <CardDescription>
                                    Fresh basil, mozzarella, tomatoes
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <CardTitle>Margherita Classica</CardTitle>
                                <CardDescription>
                                    Fresh basil, mozzarella, tomatoes
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <CardTitle>Margherita Classica</CardTitle>
                                <CardDescription>
                                    Fresh basil, mozzarella, tomatoes
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div>Choose your size</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardContent>
                                <CardTitle>Small</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <CardTitle>Medium</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <CardTitle>Large</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <CardTitle>Extra Large</CardTitle>
                            </CardContent>
                        </Card>
                        </div>
                    </div>

                    Additionl Toppings
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card>
                            <CardContent>
                                <CardTitle>Extra Large</CardTitle>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="w-1/3 relative">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold mb-2">Your Pizzas:</h3>

                            <div className="mb-3 bg-gray-100 p-4 rounded-md">
                                <div className="flex justify-between">
                                    <span>Pizza 2</span>
                                    <span>$10.00</span>
                                </div>
                                <div className="text-sm opacity-75 mt-1 flex flex-col gap-1">
                                    <span className="font-bold">Size:</span>
                                    <span>Large</span>
                                    <span className="font-bold">
                                        Additional Toppings:
                                    </span>
                                    <ul className="list-disc list-inside">
                                        <li>Cheese</li>
                                        <li>Pepperoni</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 mt-6 font-['Courier_New',_monospace] font-semibold">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${(10.0 - 2.0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Delivery</span>
                                <span>$2.00</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-xl font-bold pt-2">
                                <span>Total</span>
                                <span>${(10.0 - 2.0).toFixed(2)}</span>
                            </div>
                        </div>

                        <Button className="w-full mt-4">Place Order</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default page;
