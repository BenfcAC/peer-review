export type Product = {
    sku: string;
    price: number;
    vat?: number;
};

export type Inventory = {
    [sku: string]: { product: Product; stock: number };
};

export type Store = {
    inventory: Inventory;
    openingTimes: string[];
};
