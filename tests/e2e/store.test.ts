/**
 * store unit tests
 *
 * @group e2e
 */

import * as services from '../../src/services/getProduct';
import { Product } from '../../src/types';

const aProduct: Product = {
    price: 10,
    sku: '12-3',
    onSale: false,
};

describe('store', () => {
    describe('get product', () => {
        it('return a product with stock', async () => {
            const response = await services.getProduct(aProduct.sku);

            expect(response).toEqual({ ...aProduct, qty: 1 });
        });
    });
});
