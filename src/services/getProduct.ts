import { getStore } from '../api/api';
import { Product } from '../types';
import { checkStock } from './storeUtilities';

export const getProduct = async (sku: string, qty: number = 1): Promise<Product | null> => {
    const { inventory } = await getStore();
    if (!checkStock(inventory, sku, qty)) return null;

    const { product } = inventory[sku];

    return { ...product };
};
