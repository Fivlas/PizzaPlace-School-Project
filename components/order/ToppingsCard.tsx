import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import Image from 'next/image'
import NumberFlow from '@number-flow/react'
import { Topping } from '@/store/useOrderStore'
import { cn } from '@/lib/utils'

interface ToppingsCardProps {
    topping: Topping;
    handleToppingChange: (id: number, qty: number) => void;
    selectedToppings: { [key: number]: number };
}

const ToppingsCard = ({ topping, handleToppingChange, selectedToppings }: ToppingsCardProps) => {
    const isSelected = selectedToppings[topping.id] > 0;

    const toggleSelection = () => {
        handleToppingChange(topping.id, isSelected ? 0 : 1);
    };

    return (
        <Card 
            className={cn(
                "w-full cursor-pointer transition-all duration-200", 
                isSelected ? "border-2 border-[#e74a27] bg-orange-50" : ""
            )}
            onClick={toggleSelection}
        >
            <CardContent className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={topping.image}
                        alt={topping.name}
                        width={50}
                        height={50}
                        className="rounded-2xl"
                    />
                    <div className="flex flex-col">
                        <CardTitle>
                            {topping.name}
                        </CardTitle>
                        <CardDescription>
                            <NumberFlow
                                value={topping.price}
                                format={{
                                    style: "currency",
                                    currencyDisplay:
                                        "narrowSymbol",
                                    currency: "USD",
                                }}
                            />
                        </CardDescription>
                    </div>
                </div>
                <div className="flex items-center">
                    {isSelected ? (
                        <div 
                            className="w-6 h-6 rounded-full bg-[#e74a27] flex items-center justify-center text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToppingChange(topping.id, 0);
                            }}
                        >
                            ✓
                        </div>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    )
}

export default ToppingsCard