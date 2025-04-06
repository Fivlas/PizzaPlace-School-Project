import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import NumberFlow from '@number-flow/react'
import { useRouter } from 'next/navigation'
import { deliveryFee, useOrderStore } from "@/store/useOrderStore";
import { Separator } from '../ui/separator'
import { loadStripe } from '@stripe/stripe-js'

const Summary = () => {
    const router = useRouter();
    const { cart, removeFromCart, total, subtotal } = useOrderStore();

    const [stripePromise, setStripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!));
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
                John's Pizza
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
                                                                (x
                                                                {
                                                                    topping.quantity
                                                                }
                                                                ) -{" "}
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

                    <Button
                        className="w-full mt-4"
                        disabled={cart.length === 0}
                        onClick={handleOrder}
                    >
                        Place Order
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Summary