import { getStore } from '../api/api';
import { Product } from '../types';
import { checkStock } from './storeUtilities';

export const getProduct = async (sku: string, qty: number = 1): Promise<Product | null> => {
    const { inventory } = await getStore();
    if (!checkStock(inventory, sku, qty)) return null;

    const { product } = inventory[sku];

    if (product.onSale) {
        product.salePrice = product.price * (product.discount / 100);
        product.saving = product.price * (1 - product.discount / 100);
    }

    return { ...product };
};
