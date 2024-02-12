import {
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "../css-styles/commom-styles";
import { useNavigation } from "@react-navigation/native";
import { db } from "../services/config";
import Loader from "../components/loader";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/auth-context";

const RegisterScreen = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123123");
  const [firstname, setFirstname] = useState("a");
  const [lastname, setLastname] = useState("a");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { onRegister } = useAuth();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const user = await onRegister(email, password, firstname);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          displayName: firstname,
          lastName: lastname,
          email: email,
          uid: user.uid,
          photoUrl: "",
        });

        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require("../assets/logo.jpg")} style={styles.image} />
          <Text style={styles.title}>Registro</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={firstname}
            onChangeText={setFirstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastname}
            onChangeText={setLastname}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          {loading ? (
            <Loader />
          ) : (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSignUp}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.title5}>
              ¿Ya estás registrado? Inicia Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
