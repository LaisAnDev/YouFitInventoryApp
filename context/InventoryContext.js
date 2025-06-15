import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const productsData = await AsyncStorage.getItem('products');
      const salesData = await AsyncStorage.getItem('sales');
      if (productsData) setProducts(JSON.parse(productsData));
      if (salesData) setSales(JSON.parse(salesData));
    };
    loadData();
  }, []);

  const saveData = async (updatedProducts, updatedSales) => {
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    await AsyncStorage.setItem('sales', JSON.stringify(updatedSales));
  };

  const addProduct = (name, quantity, price) => {
    const newProduct = { id: uuidv4(), name, quantity, price };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveData(updatedProducts, sales);
  };

  const sellProduct = (id, quantity) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? { ...product, quantity: product.quantity - quantity }
        : product
    );
    setProducts(updatedProducts);

    const newSale = {
      productId: id,
      productName: products.find(product => product.id === id).name,
      quantity,
    };
    const updatedSales = [...sales, newSale];
    setSales(updatedSales);

    saveData(updatedProducts, updatedSales);
  };

  const updateProductQuantity = (id, newQuantity) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);
    saveData(updatedProducts, sales);
  };

  const deleteProduct = async (id) => {
    
    await AsyncStorage.removeItem(id);

    
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);

    
    const updatedSales = sales.filter(sale => sale.productId !== id);
    setSales(updatedSales);

    
    saveData(updatedProducts, updatedSales);
  };

  return (
    <InventoryContext.Provider value={{
      products,
      sales,
      addProduct,
      sellProduct,
      updateProductQuantity,
      deleteProduct,
    }}>
      {children}
    </InventoryContext.Provider>
  );
};
