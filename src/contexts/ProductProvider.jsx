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
  const [products, setProducts] = useState([]);
  // const [products, dispatch] = useReducer(productReducer, {
  //   products: [],
  // });

  const getData = async () => {
    try {
      const { products: data } = await fetchRequest("/api/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log(products);

  return (
    <ProductContext.Provider value={{ products }}>
      {/* <ProductDispatchContext.Provider value={dispatch}> */}
      {children}
      {/* </ProductDispatchContext.Provider> */}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
