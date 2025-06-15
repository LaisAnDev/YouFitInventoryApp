import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { InventoryContext } from '../context/InventoryContext';
import colors from '../theme/colors';

export default function EditProductScreen({ route, navigation }) {
  const { editProduct, deleteProduct } = useContext(InventoryContext);
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [price, setPrice] = useState(product.price.toString());

  const handleSave = () => {
    if (!name || !quantity || !price) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    editProduct(product.id, {
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    });
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Confirmar exclusão', 'Deseja realmente excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteProduct(product.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Quantidade"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Preço (R$)"
        keyboardType="decimal-pad"
      />

      <Button title="Salvar Alterações" color={colors.primary} onPress={handleSave} />
      <View style={{ height: 10 }} />
      <Button title="Excluir Produto" color={colors.danger} onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  input: {
    borderWidth: 1,
    borderColor: colors.secondaryText,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
