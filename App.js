import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InventoryProvider } from './context/InventoryContext';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import SalesScreen from './screens/SalesScreen';
import SummaryScreen from './screens/SummaryScreen';
import LoginScreen from './screens/LoginScreen';
import Header from './components/Header';
import colors from './theme/colors';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <InventoryProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: (props) => <Header {...props} />,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Estoque You Fit" component={HomeScreen} />
          <Stack.Screen name="Adicionar Produto" component={AddProductScreen} />
          <Stack.Screen name="Registrar Venda" component={SalesScreen} />
          <Stack.Screen name="Resumo" component={SummaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </InventoryProvider>
  );
}
