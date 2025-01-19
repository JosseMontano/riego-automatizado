import React from "react";
import { View, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { useLinkTo } from "@react-navigation/native";
import { primaryColor } from "../constants/styles";
import { post } from "../utils/fetch";

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

  const onSubmit = async(data: LoginFormInputs) => {
   const res = await post("login", data)
  console.log(res); 
  if(res.token){
      //linkTo("/Features");
  }
 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>
        Bienvenido de vuelta, se te echaba de menos!
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
                style={{marginTop: errors.password ? 0 : 15 }}
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
    
      <Text
        style={[styles.forgotPassword, { marginTop: errors.password ? 0 : 15 }]}
      >
        Olvidaste tu contraseña?
      </Text>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        labelStyle={{ fontSize: 17 }}
      >
        Iniciar Sesión
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
    marginBottom: 15,
    textAlign: "right",
    color: primaryColor,
  },
  button: {
    backgroundColor: primaryColor,
    borderRadius: 10,
  },
});

export default LoginScreen;
