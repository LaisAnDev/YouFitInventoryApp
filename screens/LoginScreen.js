import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import colors from '../theme/colors';
import logo from '../assets/logo.png';


export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      navigation.replace('Estoque You Fit');
    } else {
      Alert.alert('Erro', 'Usuário ou senha inválidos!');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Entrar" color={colors.primary} onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondaryText,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 80,
    marginTop: -50,
    
  },
});
