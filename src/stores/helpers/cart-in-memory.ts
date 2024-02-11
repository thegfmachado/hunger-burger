import { ProductProps } from "@/fixture/products";
import { ProductCartProps } from "../cart-store";

function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(
    (product) => product.id === newProduct.id
  );

  if (existingProduct) {
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  return [...products, { ...newProduct, quantity: 1 }];
}

function remove(products: ProductCartProps[], id: string) {
  const updatedProducts = products.map((product) =>
    product.id === id
      ? {
        ...product,
        quantity: product.quantity > 1 ? product.quantity - 1 : 0,
      }
      : product
  )

  return updatedProducts.filter(product => product.quantity > 0);
}

export { add, remove };
