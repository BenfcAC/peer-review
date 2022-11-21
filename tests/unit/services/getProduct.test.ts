/**
 * get Product unit tests
 *
 * @group unit
 */

import { SaleProduct, Store } from '../../../src/types';
import { getStore } from '../../../src/api/api';
import { checkStock } from '../../../src/services/storeUtilities';
import { getProduct } from '../../../src/services/getProduct';
import { aProduct, aSaleProduct } from '../../testData/product';

jest.mock('../../../src/services/storeUtilities');
const mockCheckStock = checkStock as jest.MockedFunction<typeof checkStock>;

const testStore: Store = { inventory: {}, openingTimes: [] };

jest.mock('../../../src/api/api');
const mockGetStore = getStore as jest.MockedFunction<typeof getStore>;
mockGetStore.mockResolvedValue(testStore);

describe('get product', () => {
    beforeEach(() => {
        testStore.inventory = {};
        jest.clearAllMocks();
    });
    it('should correctly get a product with the provided sku', async () => {
        mockCheckStock.mockImplementationOnce(() => true);
        testStore.inventory = { '12-3': { product: aProduct(), stock: 1 } };

        const response = await getProduct(aProduct().sku);
        const expectedProduct = { ...aProduct() };

        expect(mockCheckStock).toBeCalledWith(testStore.inventory, aProduct().sku, 1);
        expect(response).toEqual(expectedProduct);
    });

    describe('sale product', () => {
        beforeEach(() => {
            mockCheckStock.mockImplementationOnce(() => true);
            testStore.inventory = { '12-3': { product: aSaleProduct(), stock: 1 } };
            mockGetStore.mockResolvedValueOnce(testStore);
        });

        // it.todo('Product type updated to include onSale');
        // it.todo('Product type updated to include field discount required when onSale is true');

        it('should return a product with a sale price', async () => {
            const response = (await getProduct(aSaleProduct().sku)) as SaleProduct;

            expect(response.salePrice).toEqual(2);
        });

        it('should return a product with a saving', async () => {
            const response = (await getProduct(aSaleProduct().sku)) as SaleProduct;

            expect(response.saving).toEqual(8);
        });
    });
});
