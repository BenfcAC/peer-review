/**
 * add Product unit tests
 *
 * @group unit
 */

import { Store } from '../../../src/types';
import { getStore } from '../../../src/api/api';
import { calculateVat, hasProduct } from '../../../src/services/storeUtilities';
import { addProduct } from '../../../src/services/addProduct';
import { aProduct } from '../../testData/product';

jest.mock('../../../src/services/storeUtilities');
const mockHasProduct = hasProduct as jest.MockedFunction<typeof hasProduct>;
const mockCalculateVat = calculateVat as jest.MockedFunction<typeof calculateVat>;

const testStore: Store = { inventory: {}, openingTimes: [] };

jest.mock('../../../src/api/api');
const mockGetStore = getStore as jest.MockedFunction<typeof getStore>;
mockGetStore.mockResolvedValue(testStore);

describe('add product', () => {
    beforeEach(() => {
        testStore.inventory = {};
        jest.clearAllMocks();
    });
    it('should correctly add a product with a default quantity of 1', async () => {
        mockHasProduct.mockReturnValueOnce(false);

        await addProduct(aProduct());

        const expectedInventory = {
            '12-3': { product: aProduct(), stock: 1 },
        };

        expect(mockHasProduct).toBeCalledWith(testStore.inventory, aProduct().sku);
        expect(testStore.inventory).toEqual(expectedInventory);
    });

    it('should correctly calculate the vat for a new product', async () => {
        mockHasProduct.mockReturnValueOnce(false);
        mockCalculateVat.mockReturnValueOnce(2);

        await addProduct(aProduct());

        expect(mockCalculateVat).toBeCalledWith(aProduct());
        expect(testStore.inventory['12-3'].product.vat).toEqual(2);
    });

    it('should correctly add a product with the provided quantity', async () => {
        mockHasProduct.mockReturnValueOnce(false);

        await addProduct(aProduct(), 4);

        const expectedInventory = {
            '12-3': { product: aProduct(), stock: 4 },
        };

        expect(testStore.inventory).toEqual(expectedInventory);
    });

    it('should correctly increase the stock by the provided quantity', async () => {
        mockHasProduct.mockReturnValueOnce(true);

        testStore.inventory = { '12-3': { product: aProduct(), stock: 1 } };

        await addProduct(aProduct(), 4);

        const expectedInventory = {
            '12-3': { product: aProduct(), stock: 5 },
        };

        expect(testStore.inventory).toEqual(expectedInventory);
    });
});
