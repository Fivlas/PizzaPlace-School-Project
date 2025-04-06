"use client"
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { Search, Trash } from "lucide-react";
import { Input } from "../ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { OrderTableProps } from "@/app/dashboard/orders/page";

const OrdersTable = ({ orders }: { orders: OrderTableProps[] }) => {
    const [selectedOrder, setSelectedOrder] = useState<OrderTableProps | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOrders, setFilteredOrders] = useState<OrderTableProps[]>([]);

    useEffect(() => {
        if (orders) {
            if (searchQuery.trim() === "") {
                setFilteredOrders(orders);
            } else {
                const lowercasedQuery = searchQuery.toLowerCase();
                const filtered = orders.filter(order => 
                    order.id.toLowerCase().includes(lowercasedQuery) ||
                    order.orderItems.some(item => 
                        item.pizzaName.toLowerCase().includes(lowercasedQuery)
                    ) ||
                    order.status.toLowerCase().includes(lowercasedQuery) ||
                    (order.totalAmount / 100).toString().includes(lowercasedQuery)
                );
                setFilteredOrders(filtered);
            }
        }
    }, [searchQuery, orders]);

    const handleRowClick = (orderId: string) => {
        const order = orders.find(order => order.id === orderId);
        if (order) {
            setSelectedOrder(order);
            setIsDialogOpen(true);
        }
    }

    const handleDeleteOrder = async (orderId: string) => {
        try {
            const response = await fetch(`/api/orders/remove`, {
                method: "DELETE",
                body: JSON.stringify({ id: orderId }),
            });
            if (response.ok) {
                setFilteredOrders(filteredOrders.filter(order => order.id !== orderId));
            } else {
                console.error("Failed to delete order");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search orders..." 
                        className="pl-8 bg-input" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Pizza Name</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <ContextMenu key={order.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow onClick={() => handleRowClick(order.id)} className="cursor-pointer hover:bg-muted/50">
                                            <TableCell className="font-medium">
                                                {order.id}
                                            </TableCell>
                                            <TableCell>
                                                {order.orderItems[0].pizzaName}
                                                {order.orderItems.length > 1 && (
                                                    <Badge variant="secondary" className="ml-2">
                                                        +{order.orderItems.length - 1} more
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>{order.totalAmount / 100}$</TableCell>
                                            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                        order.status === "paid"
                                                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                                        : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                                        }`}
                                                        >
                                                    {order.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem onClick={() => handleDeleteOrder(order.id)}>
                                            <Trash className="mr-2 h-4 w-4" />
                                            Remove
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    No orders found matching your search
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-center">
                            <span>Order Details</span>
                        </DialogTitle>
                        <DialogDescription>
                            Order ID: {selectedOrder?.id}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium">Status</p>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                        selectedOrder?.status === "paid"
                                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                        : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                    }`}
                                >
                                    {selectedOrder?.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Total Amount</p>
                                <p className="text-sm">{selectedOrder?.totalAmount ? selectedOrder.totalAmount / 100 : 0}$</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Date</p>
                                <p className="text-sm">{selectedOrder?.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString() : ''}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Stripe ID</p>
                                <p className="text-sm text-muted-foreground truncate">{selectedOrder?.stripeCheckoutSessionId}</p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-sm font-medium mb-2">Order Items</p>
                            <div className="space-y-2">
                                {selectedOrder?.orderItems.map((item, index) => (
                                    <div key={index} className="bg-muted p-3 rounded-md">
                                        <p className="font-medium">{item.pizzaName}</p>
                                        {item.toppings && item.toppings.length > 0 && (
                                            <div className="mt-1">
                                                <p className="text-xs text-muted-foreground">Toppings:</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {item.toppings.map((topping, idx) => (
                                                        <span key={idx} className="text-xs bg-background px-2 py-1 rounded-full">
                                                            {topping.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OrdersTable;
