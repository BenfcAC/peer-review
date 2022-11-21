/**
 * add product integration tests
 *
 * @group integration
 */

import * as storeUtilities from '../../src/services/storeUtilities';
import { Store } from '../../src/types';
import { getStore } from '../../src/api/api';
import { getProduct } from '../../src/services/getProduct';
import { aProduct } from '../testData/product';

const spyCheckStock = jest.spyOn(storeUtilities, 'checkStock');

const testStore: Store = {
    inventory: { '12-3': { product: aProduct(), stock: 1 } },
    openingTimes: [],
};

jest.mock('../../src/api/api');
const mockGetStore = getStore as jest.MockedFunction<typeof getStore>;
mockGetStore.mockResolvedValue(testStore);

describe('get product', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('return a product with stock', async () => {
        const response = await getProduct(aProduct().sku);
        const expectedProduct = { ...aProduct() };

        expect(spyCheckStock).toReturnWith(true);
        expect(response).toEqual(expectedProduct);
    });

    it('return null if a product is out of stock', async () => {
        testStore.inventory = { '12-3': { product: aProduct(), stock: 0 } };
        const response = await getProduct(aProduct().sku);

        expect(spyCheckStock).toReturnWith(false);
        expect(response).toEqual(null);
    });
});
