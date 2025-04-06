import { prisma } from "@/lib/prisma";
import { CartItem } from "@/store/useOrderStore";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
    try {
        const { cart } = await req.json();

        // Calculate subtotal in cents to avoid floating point issues
        const subtotalInCents = cart.reduce((sum: number, item: CartItem) => sum + (item.totalPrice * 100), 0);
        const deliveryFeeInCents = 299;
        const totalAmountInCents = subtotalInCents + deliveryFeeInCents;

        const lineItems = cart.map((item: CartItem) => {
            const toppingNames = item.toppings?.map((t) => t.name).join(", ") || "No toppings";
            const productName = `${item.pizza.name} (${item.size.name})`;
            const description = `Toppings: ${toppingNames}`;

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: productName,
                        description,
                    },
                    unit_amount: item.totalPrice * 100,
                },
                quantity: 1,
            };
        });

        const paymentSession = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [...lineItems, {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Delivery Fee",
                        description: "Delivery fee",
                    },
                    unit_amount: deliveryFeeInCents,
                },
                quantity: 1,
            }],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        });

        const order = await prisma.order.create({
            data: {
                totalAmount: totalAmountInCents,
                status: "pending",
                stripeCheckoutSessionId: paymentSession.id,
                deliveryFee: deliveryFeeInCents,
                orderItems: {
                    create: cart.map((item: CartItem) => ({
                        pizzaName: item.pizza.name,
                        pizzaSize: item.size.name,
                        quantity: 1,
                        unitPrice: item.totalPrice * 100,
                        totalPrice: item.totalPrice * 100,
                        toppings: {
                            create: item.toppings?.map(topping => ({
                                name: topping.name,
                                price: topping.price * 100
                            })) || []
                        }
                    }))
                }
            }
        });

        return NextResponse.json({
            sessionId: paymentSession.id,
        });
    } catch (error) {
        console.error("Error creating payment session:", error);
        return NextResponse.json(
            { error: "Failed to create payment session" }, 
            { status: 500 }
        );
    }
}
