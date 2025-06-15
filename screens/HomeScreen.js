import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import { InventoryContext } from '../context/InventoryContext';
import colors from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const { products, updateProductQuantity, deleteProduct } = useContext(InventoryContext);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setNewQuantity((product.quantity ?? 0).toString());
  };

  const handleSave = () => {
    const parsedQuantity = parseInt(newQuantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      Alert.alert('Quantidade inválida', 'Informe um número válido para a quantidade.');
      return;
    }
    updateProductQuantity(editingProductId, parsedQuantity);
    setEditingProductId(null);
    setNewQuantity('');
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteProduct(id)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum produto cadastrado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            {editingProductId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={newQuantity}
                  onChangeText={setNewQuantity}
                  keyboardType="numeric"
                />
                <View style={styles.editButtons}>
                  <Button title="Salvar" onPress={handleSave} color={colors.success} />
                  <Button title="Cancelar" onPress={() => setEditingProductId(null)} color={colors.danger} />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.text}>Qtd: {item.quantity}</Text>
                <Text style={styles.text}>R$ {item.price.toFixed(2)}</Text>
                {item.quantity <= 3 && (
                  <Text style={styles.alert}>⚠️ Estoque baixo! Considere repor.</Text>
                )}
                <View style={styles.actionButtons}>
                  <Button title="Editar Qtde" onPress={() => handleEdit(item)} />
                  <Button title="Excluir" onPress={() => handleDelete(item.id)} color={colors.danger} />
                </View>
              </>
            )}
          </View>
        )}
      />

      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Button title="Adicionar Produto" onPress={() => navigation.navigate('Adicionar Produto')} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Registrar Venda" onPress={() => navigation.navigate('Registrar Venda')} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Resumo" onPress={() => navigation.navigate('Resumo')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
  card: { backgroundColor: colors.card, padding: 15, marginVertical: 5, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  text: { color: colors.secondaryText },
  alert: { color: colors.danger, marginTop: 5 },
  empty: { textAlign: 'center', marginTop: 20 },
  buttons: {
    marginTop: 15,
    paddingBottom: 30,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondaryText,
    padding: 8,
    borderRadius: 5,
    width: 80,
  },
});
