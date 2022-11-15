/**
 * store unit tests
 *
 * @group integration
 */

import { VAT_RATE } from '../../src/store';
import * as storeUtilities from '../../src/services/storeUtilities';
import { Product, Store } from '../../src/types';
import { getStore } from '../../src/api/api';
import { addProduct } from '../../src/services/addProduct';

const spyHasProduct = jest.spyOn(storeUtilities, 'hasProduct');
const spyCalculateVat = jest.spyOn(storeUtilities, 'calculateVat');

const aProduct: Product = {
    price: 10,
    sku: '12-3',
};

const testStore: Store = { inventory: {}, openingTimes: [] };

jest.mock('../../src/api/api');
const mockGetStore = getStore as jest.MockedFunction<typeof getStore>;
mockGetStore.mockResolvedValue(testStore);

describe('add product', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should check product exists and return false', async () => {
        await addProduct(aProduct);

        const expectedInventory = {
            '12-3': { product: aProduct, stock: 1 },
        };

        expect(spyHasProduct).toReturnWith(false);
        expect(spyCalculateVat).toReturnWith(aProduct.price * VAT_RATE);
        expect(testStore.inventory).toEqual(expectedInventory);
    });
});
