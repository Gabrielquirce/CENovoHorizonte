import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const { height } = Dimensions.get("window");

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if(email && senha) {
      router.push("/home");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.rect}>
        <Image
          source={require('../assets/images/loginIcon.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.login}>Acesso Administrativo</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite seu email"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite sua senha"
            placeholderTextColor="rgba(255,255,255,0.5)"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/students')}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
        <Link href="/home" style={styles.voltarPagPrincipal}>
          <Text style={styles.voltarPagPrincipal}>Voltar para Página Principal</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#902121",
    justifyContent: "center",
  },
  rect: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: height * 0.05,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  login: {
    fontFamily: "georgia-regular",
    color: "white",
    fontSize: 28,
    opacity: 0.71,
    marginBottom: height * 0.03,
    textAlign: "center",
  },
  inputContainer: {
    width: "85%",
    marginBottom: height * 0.02,
  },
  label: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "white",
  },
  button: {
    height: 40,
    width: "40%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 11,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.03,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
  voltarPagPrincipal: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
      marginTop: 20,
      textAlign : "center"
    },
});