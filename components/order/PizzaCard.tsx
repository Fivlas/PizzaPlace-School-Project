import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import NumberFlow from '@number-flow/react'
import { Pizza } from '@/store/useOrderStore'

const PizzaCard = ({ pizza, selectedPizza, setSelectedPizza }: { pizza: Pizza, selectedPizza: Pizza | null, setSelectedPizza: (pizza: Pizza) => void }) => {
    return (
        <Card
            className={`cursor-pointer transition-all ${selectedPizza?.id === pizza.id
                ? "ring-2 ring-primary"
                : ""
                }`}
            onClick={() => setSelectedPizza(pizza)}
        >
            <CardContent>
                <CardTitle>{pizza.name}</CardTitle>
                <CardDescription>
                    {pizza.description}
                </CardDescription>
                <div className="mt-2 font-semibold">
                    <NumberFlow
                        value={pizza.price}
                        format={{
                            style: "currency",
                            currencyDisplay:
                                "narrowSymbol",
                            currency: "USD",
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default PizzaCard