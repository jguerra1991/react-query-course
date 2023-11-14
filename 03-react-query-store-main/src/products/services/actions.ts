import { type Product, ProductsApi } from "..";

interface GetProductOptions {
    filterKey?: string;
}

export const sleep = (seconds: number):Promise<boolean> => {
    return new Promise ( resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000)  
    })
}

export const getProducts = async ({ filterKey}: GetProductOptions): Promise<Product[]> => {

    // await sleep(2);
    const filterUrl = ( filterKey ) ? `category=${filterKey}` : "";
    const {data} = await ProductsApi.get<Product[]>(`/products?${filterUrl}`);

    return data;
};	


export const getProductById= async (id : number ): Promise<Product> => {

    // await sleep(2);
    const {data} = await ProductsApi.get<Product>(`/products/${id}`);

    return data;
};	

export interface ProductLike {
    id?:         number;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    image:       string;
}

export const createProduct = async (product: ProductLike) => {
    console.log('holaaaa')
    await sleep(5);
    console.log('holaaaa2')
    throw new Error('Error al crear el producto');

    const {data} = await ProductsApi.post<Product>(`/products`, product);
    return data;
}