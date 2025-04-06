import { create } from "zustand";

export const deliveryFee = 2.99;

export type Pizza = {
    id: number;
    name: string;
    price: number;
    description: string;
};

export type Size = {
    id: number;
    name: string;
    price: number;
};

export type Topping = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity?: number;
};

export type CartItem = {
    id: number;
    pizza: Pizza;
    size: Size;
    toppings: (Topping & { quantity: number })[];
    totalPrice: number;
};

type ToppingQuantities = { [key: number]: number };

type OrderState = {
    selectedPizza: Pizza | null;
    selectedSize: Size | null;
    selectedToppings: ToppingQuantities;
    cart: CartItem[];
    setSelectedPizza: (pizza: Pizza) => void;
    setSelectedSize: (size: Size) => void;
    handleToppingChange: (id: number, qty: number) => void;
    addToOrder: (toppingsList: Topping[]) => void;
    removeFromCart: (id: number) => void;
    resetSelections: () => void;
    calculateSubtotal: () => number;
    calculateTotal: (cartOverride?: CartItem[]) => number;
    total: number;
};

export const useOrderStore = create<OrderState>((set, get) => ({
    selectedPizza: null,
    selectedSize: null,
    selectedToppings: {},
    cart: [],
    total: 0,

    setSelectedPizza: (pizza) => {
        set({
            selectedPizza: pizza,
            selectedSize: { id: 1, name: "Small", price: 0 },
        });
    },

    setSelectedSize: (size) => set({ selectedSize: size }),

    handleToppingChange: (id, qty) =>
        set((state) => ({
            selectedToppings: {
                ...state.selectedToppings,
                [id]: Math.max(0, (state.selectedToppings[id] || 0) + qty),
            },
        })),

    addToOrder: (toppingsList) => {
        const {
            selectedPizza,
            selectedSize,
            selectedToppings,
            cart,
            resetSelections,
        } = get();
        if (!selectedPizza || !selectedSize) return;

        const activeToppings = Object.entries(selectedToppings)
            .filter(([_, qty]) => qty > 0)
            .map(([id, qty]) => {
                const topping = toppingsList.find((t) => t.id === parseInt(id));
                return { ...topping!, quantity: qty };
            });

        const totalPrice =
            selectedPizza.price +
            selectedSize.price +
            activeToppings.reduce((sum, t) => sum + t.price * t.quantity, 0);

        const newItem: CartItem = {
            id: Date.now(),
            pizza: selectedPizza,
            size: selectedSize,
            toppings: activeToppings,
            totalPrice,
        };

        const newCart = [...cart, newItem];
        set({
            cart: newCart,
            total: get().calculateTotal(newCart),
        });

        resetSelections();
    },

    removeFromCart: (id) => {
        const newCart = get().cart.filter((item) => item.id !== id);
        set({
            cart: newCart,
            total: get().calculateTotal(newCart),
        });
    },

    resetSelections: () =>
        set({
            selectedPizza: null,
            selectedSize: null,
            selectedToppings: {},
        }),

    calculateSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.totalPrice, 0);
    },

    calculateTotal: (cartOverride?: CartItem[]) => {
        const cartToUse = cartOverride || get().cart;
        const subtotal = cartToUse.reduce((sum, item) => sum + item.totalPrice, 0);
        if (subtotal === 0) {
            return 0;
        }
        return subtotal + deliveryFee;
    },
}));
