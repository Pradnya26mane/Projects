import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import axios from 'axios';  // Import Axios

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // For error/success messages
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });
      setMessage(response.data.message);
      // On successful login, you can navigate to the next screen or do something
      if (response.data.message === 'Login successful') {
        router.push('/home'); // Redirect to the home screen (example)
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {message && <Text>{message}</Text>}  {/* Display the message */}
      <Text style={styles.link} onPress={() => router.push('/register')}>
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  link: { color: 'blue', marginTop: 15 },
});
