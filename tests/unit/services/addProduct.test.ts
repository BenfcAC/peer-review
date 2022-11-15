/**
 * add Product unit tests
 *
 * @group unit
 */

import { Product, Store } from '../../../src/types';
import { getStore } from '../../../src/api/api';
import { calculateVat, checkStock, hasProduct } from '../../../src/services/storeUtilities';
import { addProduct } from '../../../src/services/addProduct';

jest.mock('../../../src/services/storeUtilities');
const mockHasProduct = hasProduct as jest.MockedFunction<typeof hasProduct>;
const mockCalculateVat = calculateVat as jest.MockedFunction<typeof calculateVat>;

const aProduct: Product = {
    price: 10,
    sku: '12-3',
};
let testStore: Store = { inventory: {}, openingTimes: [] };

jest.mock('../../../src/api/api');
const mockGetStore = getStore as jest.MockedFunction<typeof getStore>;
mockGetStore.mockResolvedValue(testStore);

describe('add product', () => {
    beforeEach(() => {
        testStore = { inventory: {}, openingTimes: [] };
        jest.clearAllMocks();
    });
    it('should correctly add a product with a default quantity of 1', async () => {
        mockHasProduct.mockImplementationOnce(() => false);
        mockGetStore.mockResolvedValueOnce(testStore);

        await addProduct(aProduct);

        expect(mockHasProduct).toBeCalledTimes(1);
        expect(mockHasProduct).toBeCalledWith(testStore.inventory, aProduct.sku);
        const expectedInventory = {
            '12-3': { product: aProduct, stock: 1 },
        };

        expect(testStore.inventory).toEqual(expectedInventory);
    });

    it('should correctly calculate the vat for a new product', async () => {
        mockHasProduct.mockImplementationOnce(() => false);
        mockCalculateVat.mockImplementationOnce(() => 2);
        mockGetStore.mockResolvedValueOnce(testStore);

        await addProduct(aProduct);
        expect(mockHasProduct).toBeCalledTimes(1);
        expect(mockCalculateVat).toBeCalledTimes(1);

        expect(testStore.inventory['12-3'].product.vat).toEqual(2);
    });

    it('should correctly add a product with the provided quantity', async () => {
        mockHasProduct.mockImplementationOnce(() => false);
        mockGetStore.mockResolvedValueOnce(testStore);

        await addProduct(aProduct, 4);
        expect(testStore.inventory).toEqual({
            '12-3': { product: aProduct, stock: 4 },
        });
    });

    it('should correctly increase the stock by the provided quantity', async () => {
        mockHasProduct.mockImplementationOnce(() => true);

        testStore.inventory = { '12-3': { product: aProduct, stock: 1 } };
        mockGetStore.mockResolvedValueOnce(testStore);

        await addProduct(aProduct, 4);
        expect(testStore.inventory).toEqual({
            '12-3': { product: aProduct, stock: 5 },
        });
    });
});
