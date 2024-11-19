//Type for a product
export type ProductItem = {
    id: number,
    img: string;
    category: string;
    name: string;
    price: number;
};

//Type for an array of products
export type Product = ProductItem[];

//Type for a product in the cart(without img and category)
export type ProductCartItem = Omit<ProductItem, "img" | "category"> & {
    quantity: number;
}

//Type for an array of products in the cart
export type ProductCart = ProductCartItem[];
