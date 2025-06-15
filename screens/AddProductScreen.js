import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { InventoryContext } from '../context/InventoryContext';
import colors from '../theme/colors';

export default function AddProductScreen({ navigation }) {
  const { addProduct } = useContext(InventoryContext);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    if (!name || !quantity || !price) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }
    addProduct(name, parseInt(quantity), parseFloat(price));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome da peça" style={styles.input} onChangeText={setName} value={name} />
      <TextInput placeholder="Quantidade" style={styles.input} keyboardType="numeric" onChangeText={setQuantity} value={quantity} />
      <TextInput placeholder="Preço (R$)" style={styles.input} keyboardType="decimal-pad" onChangeText={setPrice} value={price} />
      <Button title="Adicionar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  input: {
    borderWidth: 1,
    borderColor: colors.secondaryText,
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
    color: colors.text,
  },
});
