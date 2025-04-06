import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const allOrders = await prisma.order.findMany({
            include: {
                orderItems: {
                    include: {
                        toppings: true
                    }
                }
            }
        });
        
        const totalRevenue = allOrders.reduce(
            (sum, order) => sum + (order.totalAmount || 0),
            0
        );

        const totalOrders = allOrders.length;

        const paidOrders = allOrders.filter(
            (order) => order.status === "paid"
        ).length;

        const now = new Date();
        const currentMonthStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );
        const previousMonthStart = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
        );

        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);

        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);

        const todayOrders = allOrders.filter(
            (order) => new Date(order.createdAt) >= todayStart
        ).length;

        const pastWeekOrders = allOrders.filter(
            (order) =>
                new Date(order.createdAt) >= oneWeekAgo &&
                new Date(order.createdAt) < todayStart
        ).length;

        const currentMonthOrders = allOrders.filter(
            (order) => new Date(order.createdAt) >= currentMonthStart
        ).length;

        const previousMonthOrders = allOrders.filter(
            (order) =>
                new Date(order.createdAt) >= previousMonthStart &&
                new Date(order.createdAt) < currentMonthStart
        ).length;

        const growthRate =
            previousMonthOrders === 0
                ? 100
                : ((currentMonthOrders - previousMonthOrders) /
                      previousMonthOrders) *
                100;

        const weeklyGrowthRate =
            pastWeekOrders === 0
                ? 100
                : ((todayOrders - pastWeekOrders) / pastWeekOrders) * 100;

        const pizzaTypes: Record<string, number> = {};
        const pizzaSizes: Record<string, number> = {};
        const toppingPopularity: Record<string, number> = {};

        allOrders.forEach(order => {
            order.orderItems.forEach(item => {
                if (!pizzaTypes[item.pizzaName]) {
                    pizzaTypes[item.pizzaName] = 0;
                }
                pizzaTypes[item.pizzaName] += item.quantity;

                if (!pizzaSizes[item.pizzaSize]) {
                    pizzaSizes[item.pizzaSize] = 0;
                }
                pizzaSizes[item.pizzaSize] += item.quantity;

                item.toppings.forEach(toppingRelation => {
                    if (!toppingPopularity[toppingRelation.id]) {
                        toppingPopularity[toppingRelation.id] = 0;
                    }
                    toppingPopularity[toppingRelation.id] += item.quantity;
                });
            });
        });

        return NextResponse.json({
            totalRevenue,
            totalOrders,
            paidOrders,
            growthRate: parseFloat(growthRate.toFixed(2)),
            weeklyGrowthRate: parseFloat(weeklyGrowthRate.toFixed(2)),
            currentMonthOrders,
            previousMonthOrders,
            todayOrders,
            pastWeekOrders,
            pizzaStats: {
                types: pizzaTypes,
                sizes: pizzaSizes,
                toppings: toppingPopularity
            }
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch statistics" },
            { status: 500 }
        );
    }
};
