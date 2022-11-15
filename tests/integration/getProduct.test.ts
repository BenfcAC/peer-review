/**
 * store unit tests
 *
 * @group integration
 */

import * as storeUtilities from '../../src/services/storeUtilities';
import { Product, Store } from '../../src/types';
import { getStore } from '../../src/api/api';
import { getProduct } from '../../src/services/getProduct';

const spyCheckStock = jest.spyOn(storeUtilities, 'checkStock');

const aProduct: Product = {
    price: 10,
    sku: '12-3',
};

const testStore: Store = {
    inventory: { '12-3': { product: aProduct, stock: 1 } },
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
        const store = await getStore();
        console.log(store);

        const response = await getProduct(aProduct.sku);
        const expectedProduct = { ...aProduct };
        expect(spyCheckStock).toReturnWith(true);
        expect(response).toEqual(expectedProduct);
    });
});
