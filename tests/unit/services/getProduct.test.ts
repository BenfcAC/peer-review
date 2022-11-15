/**
 * get Product unit tests
 *
 * @group unit
 */

import { Product, Store } from '../../../src/types';
import { getStore } from '../../../src/api/api';
import { checkStock } from '../../../src/services/storeUtilities';
import { getProduct } from '../../../src/services/getProduct';

jest.mock('../../../src/services/storeUtilities');
const mockCheckStock = checkStock as jest.MockedFunction<typeof checkStock>;

const aProduct: Product = {
    price: 10,
    sku: '12-3',
};

let testStore: Store = { inventory: {}, openingTimes: [] };

jest.mock('../../../src/api/api');
const mockGetStore = getStore as jest.MockedFunction<typeof getStore>;
mockGetStore.mockResolvedValue(testStore);

describe('get product', () => {
    beforeEach(() => {
        testStore = { inventory: {}, openingTimes: [] };
        jest.clearAllMocks();
    });
    it('should correctly get a product with the provided sku', async () => {
        mockCheckStock.mockImplementationOnce(() => true);
        testStore.inventory = { '12-3': { product: aProduct, stock: 1 } };
        mockGetStore.mockResolvedValueOnce(testStore);

        const response = await getProduct(aProduct.sku);
        const expectedProduct = { ...aProduct };

        expect(mockCheckStock).toBeCalledTimes(1);
        expect(mockCheckStock).toBeCalledWith(testStore.inventory, aProduct.sku, 1);
        expect(response).toEqual(expectedProduct);
    });
});
