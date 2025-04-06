"use client"
import { SectionCards } from "@/components/dashboard/SectionCards";
import { ChartAreaInteractive } from "@/components/dashboard/ChartAreaInteractive";
import { cardsData, chartConfig, chartData } from "@/constants/dashboard/main";
import { useEffect, useState } from "react";
import { OrderTableProps } from "./orders/page";
import OrdersTable from "@/components/dashboard/OrdersTable";

const page = () => {
    const [orders, setOrders] = useState<OrderTableProps[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch("/api/orders/all");
            const data = await response.json();
            setOrders(data);
        };
        fetchOrders();
    }, []);
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards cardsData={cardsData} />
                <div className="px-4 lg:px-6">
                    <ChartAreaInteractive data={chartData} config={chartConfig} />
                </div>
                <div className="px-4 lg:px-6">
                    <OrdersTable orders={orders} />
                </div>
            </div>
        </div>
    );
};

export default page;
