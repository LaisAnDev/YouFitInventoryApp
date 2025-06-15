import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { InventoryContext } from '../context/InventoryContext';
import { getTopProduct, getTotalSales } from '../utils/calculateSummary';
import { BarChart } from 'react-native-chart-kit';
import colors from '../theme/colors';

export default function SummaryScreen() {
  const { products, sales } = useContext(InventoryContext);

  // Lista de ids dos produtos ativos
  const activeProductIds = products.map(product => product.id);

  // Filtra as vendas para considerar apenas as dos produtos ativos
  const filteredSales = sales.filter(sale => activeProductIds.includes(sale.productId));

  // Calcula total e top produto com vendas filtradas
  const total = getTotalSales(filteredSales);
  const topProduct = getTopProduct(filteredSales);

  // Cria um objeto para agregar quantidade vendida por produto ativo
  const salesByProduct = {};
  products.forEach(product => {
    salesByProduct[product.name] = 0; // começa com zero
  });

  // Soma quantidade das vendas filtradas para cada produto
  filteredSales.forEach(sale => {
    if (salesByProduct.hasOwnProperty(sale.productName)) {
      salesByProduct[sale.productName] += sale.quantity;
    }
  });

  // Prepara labels e dados para o gráfico mantendo todos os produtos
  const productNames = Object.keys(salesByProduct).map(name =>
    name.length > 8 ? name.slice(0, 8) + '…' : name
  );
  const quantities = Object.values(salesByProduct);

  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const dim = Dimensions.get('window');
      setIsLandscape(dim.width > dim.height);
    };

    updateOrientation();
    const subscription = Dimensions.addEventListener('change', updateOrientation);
    return () => subscription?.remove();
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.max(screenWidth, productNames.length * 60);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumo de Vendas</Text>
      <Text style={styles.item}>Total vendido: R$ {total.toFixed(2)}</Text>

      {topProduct?.name ? (
        <>
          <Text style={styles.item}>Peça mais vendida: {topProduct.name}</Text>
          <Text style={styles.item}>Quantidade vendida: {topProduct.quantity}</Text>
        </>
      ) : (
        <Text style={styles.item}>Ainda não há vendas registradas.</Text>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ minHeight: isLandscape ? 300 : 220 }}>
          <BarChart
            data={{
              labels: productNames,
              datasets: [{ data: quantities }],
            }}
            width={chartWidth}
            height={isLandscape ? 300 : 220}
            fromZero={true}
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: colors.primary,
              },
            }}
            style={{ marginVertical: 8, borderRadius: 16 }}
            verticalLabelRotation={30}
            xLabelsOffset={-10}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.background },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: colors.primary },
  item: { fontSize: 16, marginVertical: 5, color: colors.text },
});
