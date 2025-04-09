"use client"

import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import NumberFlow from '@number-flow/react'
import { useRouter } from 'next/navigation'
import { deliveryFee, useOrderStore } from "@/store/useOrderStore";
import { Separator } from '../ui/separator'
import { loadStripe } from '@stripe/stripe-js'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const Summary = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [phone, setPhone] = useState("");

    const { cart, removeFromCart, total, subtotal } = useOrderStore();

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const handleOrder = async () => {
        try {
            const res = await fetch('/api/payment/create-payment-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart
                }),
            });

            const { sessionId } = await res.json();

            const stripe = await stripePromise;
            if (!stripe) {
                console.error("Stripe is not loaded");
                return;
            }
            console.log(sessionId);
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId,
            });

            if (error) {
                console.error("Payment failed:", error);
            }
        } catch (error) {
            console.error("Error creating payment intent:", error);
        }
    };
    return (
        <div>
            <h1 onClick={() => router.push("/")} className="cursor-pointer text-5xl md:text-6xl text-center mb-6 font-bold leading-tight text-[#e74a27] font-[Shrikhand] decoration-wavy underline underline-offset-11">
                John&apos;s Pizza
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold mb-2">Your Pizzas:</h3>

                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                Your cart is empty
                            </p>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="mb-3 bg-gray-100 p-4 rounded-md"
                                >
                                    <div className="flex justify-between">
                                        <span>{item.pizza.name}</span>
                                        <NumberFlow
                                            value={item.pizza.price}
                                            format={{
                                                style: "currency",
                                                currencyDisplay: "narrowSymbol",
                                                currency: "USD",
                                            }}
                                        />
                                    </div>
                                    <div className="text-sm opacity-75 mt-1 flex flex-col gap-1">
                                        <span className="font-bold">
                                            Size:
                                        </span>
                                        <span>
                                            {item.size.name} -{" "}
                                            {item.size.price > 0 ? (
                                                <NumberFlow
                                                    value={
                                                        item.size.price
                                                    }
                                                    format={{
                                                        style: "currency",
                                                        currencyDisplay:
                                                            "narrowSymbol",
                                                        currency: "USD",
                                                    }}
                                                />
                                            ) : (
                                                "Included"
                                            )}
                                        </span>
                                        {item.toppings.length > 0 && (
                                            <>
                                                <span className="font-bold">
                                                    Additional Toppings:
                                                </span>
                                                <ul className="list-disc list-inside">
                                                    {item.toppings.map(
                                                        (topping) => (
                                                            <li
                                                                key={
                                                                    topping.id
                                                                }
                                                            >
                                                                {
                                                                    topping.name
                                                                }{" "}
                                                                -{" "}
                                                                <NumberFlow
                                                                    value={
                                                                        topping.price *
                                                                        topping.quantity
                                                                    }
                                                                    format={{
                                                                        style: "currency",
                                                                        currencyDisplay:
                                                                            "narrowSymbol",
                                                                        currency:
                                                                            "USD",
                                                                    }}
                                                                />
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                    <div className="mt-2 flex justify-end">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="pt-4 mt-6 font-['Courier_New',_monospace] font-semibold">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <NumberFlow
                                value={subtotal}
                                format={{
                                    style: "currency",
                                    currencyDisplay: "narrowSymbol",
                                    currency: "USD",
                                }}
                            />
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Delivery</span>
                            <NumberFlow
                                value={deliveryFee}
                                format={{
                                    style: "currency",
                                    currencyDisplay: "narrowSymbol",
                                    currency: "USD",
                                }}
                            />
                        </div>
                        <Separator />
                        <div className="flex justify-between text-xl font-bold pt-2">
                            <span>Total</span>
                            <NumberFlow
                                value={total}
                                format={{
                                    style: "currency",
                                    currencyDisplay: "narrowSymbol",
                                    currency: "USD",
                                }}
                            />
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="w-full mt-4"
                                disabled={cart.length === 0}
                            >
                                Place Order
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delivery Address</DialogTitle>
                                <DialogDescription>
                                    Please enter your delivery address below.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" className="col-span-3" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="street" className="text-right">
                                        Street
                                    </Label>
                                    <Input id="street" className="col-span-3" onChange={(e) => setStreet(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">
                                        Phone number
                                    </Label>
                                    <Input id="phone" className="col-span-3" onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={!name || !street || !phone} onClick={handleOrder}>Confirm Order</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    )
}

export default Summary