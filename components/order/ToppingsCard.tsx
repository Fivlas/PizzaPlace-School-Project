import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import Image from 'next/image'
import NumberFlow from '@number-flow/react'
import { Button } from '../ui/button'
import { Topping } from '@/store/useOrderStore'

interface ToppingsCardProps {
    topping: Topping;
    handleToppingChange: (id: number, qty: number) => void;
    selectedToppings: { [key: number]: number };
}

const ToppingsCard = ({ topping, handleToppingChange, selectedToppings }: ToppingsCardProps) => {
    return (
        <Card className="w-full">
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
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            handleToppingChange(
                                topping.id,
                                1
                            )
                        }
                    >
                        +
                    </Button>
                    {selectedToppings[topping.id] || 0}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            handleToppingChange(
                                topping.id,
                                -1
                            )
                        }
                        disabled={
                            !selectedToppings[
                            topping.id
                            ]
                        }
                    >
                        -
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ToppingsCard