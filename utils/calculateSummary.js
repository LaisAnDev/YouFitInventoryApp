export const getTopProduct = (sales) => {
  const productSales = sales.reduce((acc, sale) => {
    acc[sale.productName] = (acc[sale.productName] || 0) + sale.quantity;
    return acc;
  }, {});
  
  const topProduct = Object.entries(productSales).reduce((max, [name, quantity]) =>
    quantity > max.quantity ? { name, quantity } : max, { name: '', quantity: 0 });
  
  return topProduct;
};

export const getTotalSales = (sales) => {
  return sales.reduce((total, sale) => total + sale.quantity, 0);
};
