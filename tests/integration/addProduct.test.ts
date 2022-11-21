/**
 * get product integration tests
 *
 * @group integration
 */

import { VAT_RATE } from '../../src/store';
import * as storeUtilities from '../../src/services/storeUtilities';
import { Store } from '../../src/types';
import { getStore } from '../../src/api/api';
import { addProduct } from '../../src/services/addProduct';
import { aProduct } from '../testData/product';

const spyHasProduct = jest.spyOn(storeUtilities, 'hasProduct');
const spyCalculateVat = jest.spyOn(storeUtilities, 'calculateVat');

const testStore: Store = { inventory: {}, openingTimes: [] };

jest.mock('../../src/api/api');
const mockGetStore = getStore as jest.MockedFunction<typeof getStore>;
mockGetStore.mockResolvedValue(testStore);

describe('add product', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        testStore.inventory = {};
    });
    it('should check product exists and return false', async () => {
        await addProduct(aProduct());

        expect(spyHasProduct).toReturnWith(false);
    });

    it('should calculate the VAT of the product', async () => {
        await addProduct(aProduct());

        expect(spyCalculateVat).toReturnWith(aProduct().price * VAT_RATE);
    });

    it('should add a product to the store inventory', async () => {
        await addProduct(aProduct());

        const expectedInventory = { [aProduct().sku]: { product: { ...aProduct(), vat: 2 }, stock: 1 } };

        expect(testStore.inventory).toEqual(expectedInventory);
    });
});
