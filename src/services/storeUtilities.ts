import { VAT_RATE } from '../store';
import { Inventory, Product } from '../types';

export const hasProduct = (inventory: Inventory, sku: string): boolean => sku in inventory;

export const checkStock = function (inventory: Inventory, sku: string, qty: number) {
    if (!hasProduct(inventory, sku)) return false;

    const hasStock = inventory[sku].stock >= qty;
    if (!hasStock) return false;

    return true;
};

export const calculateVat = (product: Product): number => {
    return product.price * VAT_RATE;
};
