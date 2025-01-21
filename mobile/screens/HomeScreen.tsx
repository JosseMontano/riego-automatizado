import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { useLinkTo } from "@react-navigation/native";
import { primaryColor } from "../constants/styles";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  })
  .required();

const LoginScreen = () => {
  const linkTo = useLinkTo();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/iot.png")} style={styles.image} />
      <View style={styles.containerContent}>
        <View style={styles.containerText}>
          <Text style={styles.title}>
            Descubre las ventajas de la tecnologia
          </Text>
        </View>

        <View style={[styles.containerText, { width: 350 }]}>
          <Text style={styles.subtitle}>
            Controla tu riego cómodamente desde tu celular, cuidando tus plantas
            en todo momento.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={() => linkTo("/Login")}
            style={styles.button}
          >
            Iniciar Sesión
          </Button>
          <Button
            mode="contained"
            onPress={() => linkTo("/Register")}
            style={[styles.button, { backgroundColor: "#f5f5f5" }]}
            labelStyle={{ color: "#000" }}
          >
            Crearse cuenta
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    gap:20,
  },
  image: {
    width: 300,
    height: 300,
  },
  containerContent: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  containerText: {
    width: 300,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  button: {
    marginTop: 16,
    backgroundColor: primaryColor,
    borderRadius: 10,
    padding:7,
  },
});

export default LoginScreen;
