import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { useLinkTo } from "@react-navigation/native";
import { primaryColor } from "../constants/styles";
import { post } from "../utils/fetch";

interface LoginFormInputs {
  email: string;
  oldPassword: string;
  newPassword: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    oldPassword: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    newPassword: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  })
  .required();

const ChangePassowrdScreen = () => {
  const linkTo = useLinkTo();
    const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true)
    const res = await post("change-password", data);
    const result = await res?.json();
    setLoading(false)
    Alert.alert(result.message);
    if (res?.status == 200 || res?.status == 201) linkTo("/Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <Text style={styles.subtitle}>
        Ingresa los datos solicitados para cambiar la contraseña
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              label="Email"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
            />
            {errors.email && (
              <HelperText
                type="error"
                visible={!!errors.email}
                style={styles.errorMsg}
              >
                {errors.email.message}
              </HelperText>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="oldPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              label="Antigua contraseña"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.oldPassword}
              style={{ marginTop: errors.oldPassword ? 0 : 15 }}
            />
            {errors.oldPassword && (
              <HelperText
                type="error"
                visible={!!errors.oldPassword}
                style={styles.errorMsg}
              >
                {errors.oldPassword.message}
              </HelperText>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              label="Nueva contraseña"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.newPassword}
              style={{ marginTop: errors.newPassword ? 0 : 15 }}
            />
            {errors.newPassword && (
              <HelperText
                type="error"
                visible={!!errors.newPassword}
                style={styles.errorMsg}
              >
                {errors.newPassword.message}
              </HelperText>
            )}
          </>
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={[styles.button, { marginTop: errors.newPassword ? 0 : 15 }]}
        labelStyle={{ fontSize: 17 }}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Cambiar contraseña"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: primaryColor,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
    width: 300,
    alignSelf: "center",
  },
  errorMsg: {
    fontWeight: "bold",
    fontSize: 13,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    color: primaryColor,
  },
  button: {
    backgroundColor: primaryColor,
    borderRadius: 10,
  },
});

export default ChangePassowrdScreen;
