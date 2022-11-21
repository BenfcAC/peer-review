import { Product, SaleProduct } from '../../src/types';

export const aProduct = (): Product => ({
    price: 10,
    sku: '12-3',
    onSale: false,
});

export const aSaleProduct = (): SaleProduct => ({
    price: 10,
    sku: '12-3',
    onSale: true,
    discount: 20,
});
