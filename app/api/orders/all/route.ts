import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                orderItems: {
                    include: {
                        toppings: true
                    }
                }
            }
        });
        return NextResponse.json(orders || []);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json([]);
    }
}