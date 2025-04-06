'use server'

import { prisma } from "@/lib/prisma"

export const updateOrderStatus = async (sessionId: string) => {
    try {
        const order = await prisma.order.findFirst({
            where: {
                stripeCheckoutSessionId: sessionId
            }
        })

        if (!order) {
            return { success: false, error: "Order not found" }
        }

        await prisma.order.update({
            where: { id: order.id },
            data: { status: "paid" }
        })

        return { success: true }
    } catch (error) {
        console.error("Error updating order status:", error)
        return { success: false, error: "Failed to update order status" }
    }
}