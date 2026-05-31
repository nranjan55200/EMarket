import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [Data, setData] = useState();

  // fetching all products from api
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=150");
      
      const productsData = res.data.products;
      setData(productsData);
    } catch (error) {
      console.log(error);
    }
  };

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property];
    });
    newVal = ["All", ...new Set(newVal)];
    return newVal;
  };

  const categoryOnlyData = getUniqueCategory(Data, "category");
  const brandOnlyData = getUniqueCategory(Data, "brand");
  return (
    <DataContext.Provider
      value={{
        Data,
        setData,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const getData = () => useContext(DataContext);
