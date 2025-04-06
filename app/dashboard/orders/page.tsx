"use client"
import PageHeader from "@/components/dashboard/DashboardPageHeader";
import OrdersTable from "@/components/dashboard/OrdersTable";
import { prisma } from "@/lib/prisma";
import React, { useEffect, useState } from "react";

export interface OrderTableProps {
    id: string;
    totalAmount: number;
    orderItems: {
        pizzaName: string;
        toppings: {
            name: string;
        }[];
    }[];
    status: string;
    createdAt: Date;
    stripeCheckoutSessionId: string;
}

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
        <div className="space-y-4">
            <PageHeader title="Orders" description="Manage your orders" />
            <OrdersTable orders={orders} />
        </div>
    );
};

export default page;
