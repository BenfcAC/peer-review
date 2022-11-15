import { Store } from '../types'

export const getStore = async (): Promise<Store> => {
    const requestUrl = `http://api.products.com/store`
    return await (await fetch(requestUrl)).json()
}
