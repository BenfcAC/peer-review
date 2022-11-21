import { getStore } from '../api/api';
import { Product } from '../types';
import { calculateVat, hasProduct } from './storeUtilities';

export const addProduct = async (product: Product, qty: number = 1) => {
    const { inventory } = await getStore();
    const sku = product.sku;

    if (hasProduct(inventory, sku)) {
        inventory[sku].stock += qty;
        return;
    }

    const vat = calculateVat(product);
    inventory[sku] = { product: { ...product, vat }, stock: qty };
};
