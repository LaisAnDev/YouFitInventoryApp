import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { InventoryContext } from '../context/InventoryContext';
import colors from '../theme/colors';

export default function SalesScreen({ navigation }) {
  const { products, sellProduct } = useContext(InventoryContext);
  const [selectedId, setSelectedId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState('');

  const handleSell = () => {
    const qty = parseInt(quantity);
    if (!selectedId || !qty) {
      Alert.alert("Erro", "Selecione um produto e a quantidade.");
      return;
    }
    const product = products.find(p => p.id === selectedId);
    if (product.quantity < qty) {
      Alert.alert("Estoque insuficiente", "Não há quantidade suficiente em estoque.");
      return;
    }

    sellProduct(selectedId, qty);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedId}
        onValueChange={(itemValue) => setSelectedId(itemValue)}
        style={styles.picker}
      >
        {products.map(p => (
          <Picker.Item key={p.id} label={p.name} value={p.id} />
        ))}
      </Picker>

      <TextInput
        placeholder="Quantidade vendida"
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <Button title="Registrar Venda" color={colors.primary} onPress={handleSell} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  picker: { height: 50, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: colors.secondaryText, padding: 10, marginBottom: 15, borderRadius: 5 },
});
