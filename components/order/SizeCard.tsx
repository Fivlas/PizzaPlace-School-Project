import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import NumberFlow from '@number-flow/react'
import { Size } from '@/store/useOrderStore'

interface SizeCardProps {
    size: Size;
    selectedSize: Size | null;
    setSelectedSize: (size: Size) => void;
}

const SizeCard = ({ size, selectedSize, setSelectedSize }: SizeCardProps) => {
    return (
        <Card
            key={size.id}
            className={`cursor-pointer transition-all ${selectedSize?.id === size.id
                ? "ring-2 ring-primary"
                : ""
                }`}
            onClick={() => setSelectedSize(size)}
        >
            <CardContent>
                <CardTitle>{size.name}</CardTitle>
                <div className="mt-1">
                    {size.price > 0 ? (
                        <NumberFlow
                            value={size.price}
                            format={{
                                style: "currency",
                                currencyDisplay:
                                    "narrowSymbol",
                                currency: "USD",
                            }}
                        />
                    ) : (
                        <span>Included</span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default SizeCard