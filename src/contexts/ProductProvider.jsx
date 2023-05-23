import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { fetchRequest } from "../common/api";
import { useReducer } from "react";
import { productReducer } from "../reducers/productReducer";
import { useContext } from "react";

const ProductContext = createContext(null);
const ProductDispatchContext = createContext(null);

export default function ProductProvider({ children }) {
  const [products, productDispatch] = useReducer(productReducer, {
    productsData: [],
    productDefault: [],
    categories: [],
    search: "",
    category: [],
    price: 1000,
    rating: 0,
    brands: [],
    materials: [],
    sort: "",
  });

  const getData = async () => {
    try {
      const { products: data } = await fetchRequest("/api/products");
      productDispatch({ type: "INITIALISED_DATA", payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  const getCategories = async () => {
    try {
      const { categories: data } = await fetchRequest("/api/categories");
      productDispatch({ type: "INITIALISED_CATEGORIES", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      <ProductDispatchContext.Provider value={productDispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
export const useProductsDispatch = () => useContext(ProductDispatchContext);
