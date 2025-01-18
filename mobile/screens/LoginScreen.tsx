import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useLinkTo } from "@react-navigation/native";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
}).required();

const LoginScreen = () => {
    const linkTo = useLinkTo();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    linkTo("/Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

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
              style={styles.input}
              error={!!errors.email}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
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
              style={styles.input}
              error={!!errors.password}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password?.message}
            </HelperText>
          </>
        )}
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Iniciar Sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default LoginScreen;
