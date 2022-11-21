export interface BaseProduct<T = boolean> {
    sku: string;
    price: number;
    vat?: number;
    onSale: T;
}

export interface SaleProduct extends BaseProduct<true> {
    discount: number;
    salePrice?: number;
    saving?: number;
}

export type Product = BaseProduct<false> | SaleProduct;

export type Inventory = {
    [sku: string]: { product: Product; stock: number };
};

export type Store = {
    inventory: Inventory;
    openingTimes: string[];
};
