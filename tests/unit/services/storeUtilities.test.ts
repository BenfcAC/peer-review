/**
 * store utilities unit tests
 *
 * @group unit
 */

import * as utilities from '../../../src/services/storeUtilities';
import { Product } from '../../../src/types';

const spyHasProduct = jest.spyOn(utilities, 'hasProduct');

const aProduct: Product = { price: 12, sku: '123' };

describe('store utilities', () => {
    describe('hasProduct', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should return true if the key exists', () => {
            utilities.hasProduct({ '123': { product: aProduct, stock: 1 } }, '123');
            expect(spyHasProduct).toReturnWith(true);
        });

        it('should return false if the key does not exist', () => {
            utilities.hasProduct({ '456': { product: aProduct, stock: 1 } }, '123');
            expect(spyHasProduct).toReturnWith(false);
        });
    });

    describe('checkStock', () => {
        it('should return true if the product exists with a greater than or equal stock', () => {
            const response = utilities.checkStock({ '123': { product: aProduct, stock: 5 } }, '123', 3);
            expect(response).toEqual(true);
        });

        it('should return false if the key does not exist', () => {
            const response = utilities.checkStock({ '123': { product: aProduct, stock: 2 } }, '123', 3);
            expect(response).toEqual(false);
        });
    });
});
