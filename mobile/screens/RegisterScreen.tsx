import React from "react";
import { View, StyleSheet } from "react-native";
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    linkTo("/Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create una cuenta</Text>
      <Text style={styles.subtitle}>
        Create una cuenta y comienza a usar la tecnologia a tu favor
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
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              label="Contraseña"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.password}
              style={{ marginTop: errors.password ? 0 : 15 }}
            />
            {errors.password && (
              <HelperText
                type="error"
                visible={!!errors.password}
                style={styles.errorMsg}
              >
                {errors.password.message}
              </HelperText>
            )}
          </>
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={[styles.button, { marginTop: errors.password ? 0 : 15 }]}
        labelStyle={{ fontSize: 17 }}
      >
        Crearse una cuenta
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

export default LoginScreen;
