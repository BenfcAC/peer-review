/**
 * store utilities unit tests
 *
 * @group unit
 */

import { hasProduct, checkStock } from '../../../src/services/storeUtilities';
import { aProduct } from '../../testData/product';

describe('store utilities', () => {
    describe('hasProduct', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should return true if the key exists', () => {
            const response = hasProduct({ '123': { product: aProduct(), stock: 1 } }, '123');
            expect(response).toBe(true);
        });

        it('should return false if the key does not exist', () => {
            const response = hasProduct({ '456': { product: aProduct(), stock: 1 } }, '123');
            expect(response).toBe(false);
        });
    });

    describe('checkStock', () => {
        it('should return true if the product exists with a greater than or equal stock', () => {
            const response = checkStock({ '123': { product: aProduct(), stock: 5 } }, '123', 3);
            expect(response).toEqual(true);
        });

        it('should return false if the key does not exist', () => {
            const response = checkStock({ '123': { product: aProduct(), stock: 2 } }, '123', 3);
            expect(response).toEqual(false);
        });
    });
});
