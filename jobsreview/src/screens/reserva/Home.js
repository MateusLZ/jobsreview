import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Container } from "./Home/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const candidatoLogin = async () => {
    try {
      await AsyncStorage.setItem("tipoLoguin", "candidato");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao definir a flag:", error);
    }
  };
  const empresaLogin = async () => {
    try {
      await AsyncStorage.setItem("tipoLoguin", "empresa");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao definir a flag:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Candidato</Text>
        <TouchableOpacity style={styles.button} onPress={candidatoLogin}>
          <Text style={styles.buttonText}>Entrar como Candidato</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Empresa</Text>
        <TouchableOpacity style={styles.button} onPress={empresaLogin}>
          <Text style={styles.buttonText}>Entrar como Empresa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#e91e63",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
