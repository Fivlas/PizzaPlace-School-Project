import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
    try {
        const { id } = await request.json();
        await prisma.order.delete({ where: { id } });
        return NextResponse.json({ message: "Order deleted" });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json({ message: "Failed to delete order" }, { status: 500 });
    }
}