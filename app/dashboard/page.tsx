"use client"
import { SectionCards } from "@/components/dashboard/SectionCards";
import { useEffect, useState } from "react";
import { OrderTableProps } from "./orders/page";
import OrdersTable from "@/components/dashboard/OrdersTable";

interface StatsData {
    totalRevenue: number;
    totalOrders: number;
    paidOrders: number;
    growthRate: number;
    weeklyGrowthRate: number;
    currentMonthOrders: number;
    previousMonthOrders: number;
    todayOrders: number;
    pastWeekOrders: number;
    pizzaStats: {
        types: Record<string, number>;
        sizes: Record<string, number>;
        toppings: Record<string, number>;
    };
}

const page = () => {
    const [orders, setOrders] = useState<OrderTableProps[]>([]);
    const [stats, setStats] = useState<StatsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [ordersResponse, statsResponse] = await Promise.all([
                    fetch("/api/orders/all"),
                    fetch("/api/stats")
                ]);
                
                const ordersData = await ordersResponse.json();
                const statsData = await statsResponse.json();
                
                setOrders(ordersData);
                setStats(statsData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const cardsData = stats ? [
        {
            title: "Total Revenue",
            value: `$${(stats.totalRevenue / 100).toFixed(2)}`,
            trend: `${stats.growthRate}%`,
            isPositive: stats.growthRate >= 0,
            description: "Monthly growth rate",
            footer: `${stats.currentMonthOrders} orders this month`
        },
        {
            title: "Total Orders",
            value: `${stats.totalOrders}`,
            trend: `${stats.weeklyGrowthRate}%`,
            isPositive: stats.weeklyGrowthRate >= 0,
            description: "Weekly growth rate",
            footer: `${stats.todayOrders} orders today`
        },
        {
            title: "Paid Orders",
            value: `${stats.paidOrders}`,
            trend: stats.totalOrders > 0 ? `${Math.round((stats.paidOrders / stats.totalOrders) * 100)}%` : "0%",
            isPositive: true,
            description: "Conversion rate",
            footer: `${stats.totalOrders - stats.paidOrders} pending orders`
        },
        {
            title: "Average Order Value",
            value: stats.totalOrders > 0 ? `$${(stats.totalRevenue / stats.totalOrders / 100).toFixed(2)}` : "$0",
            trend: stats.previousMonthOrders > 0 ? `${((stats.totalRevenue / stats.totalOrders) - (stats.totalRevenue / stats.previousMonthOrders)).toFixed(2)}` : "0",
            isPositive: stats.previousMonthOrders > 0 ? ((stats.totalRevenue / stats.totalOrders) >= (stats.totalRevenue / stats.previousMonthOrders)) : true,
            description: "Per order revenue",
            footer: `Based on ${stats.totalOrders} total orders`
        }
    ] : [];
        
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {stats && <SectionCards cardsData={cardsData} />}
                        <div className="px-4 lg:px-6">
                            <OrdersTable orders={orders} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default page;
