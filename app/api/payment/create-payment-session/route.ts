// pages/api/checkout_sessions.ts
import { CartItem } from "@/store/useOrderStore";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Create an instance of Stripe using the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
    try {
        const { cart } = await req.json();

        const lineItems = cart.map((item: CartItem) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: `${item.pizza.name} (${item.size.name})`,
                },
                unit_amount: item.totalPrice * 100,
            },
            quantity: 1,
        }));

        const paymentSession = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
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
