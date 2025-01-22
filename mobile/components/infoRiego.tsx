import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { getServices } from "../utils/fetch";

interface Data {
  timestamp: string;
  temperature: string;
  humidity: string;
}

export const InfoRiego = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const resp = await getServices("sensor");
        if (resp?.ok) {
          const res = await resp.json();
          if (Array.isArray(res) && res.length > 0) {
            setData(res[res.length - 1]); // Obtiene el último valor del array.
          }
        } else {
          Alert.alert("Ha ocurrido un error al obtener los datos.");
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener la información.");
      } finally {
        setLoading(false);
      }
    };

    handleFetch(); // Llamada inicial.

    // Configura la llamada repetitiva cada 6 segundos.
    const intervalId = setInterval(() => {
      handleFetch();
    }, 6000);

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente.
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
         <View style={styles.loaderContainer}>
                 <ActivityIndicator size="large" color="#242424" />
                 <Text style={styles.loaderText}>Cargando...</Text>
               </View>
      ) : data ? (
        <View>
          <Text style={styles.text}>Última lectura:</Text>
          <Text style={styles.text}>Fecha: {data.timestamp}</Text>
          <Text style={styles.text}>Temperatura: {data.temperature}°C</Text>
          <Text style={styles.text}>Humedad: {data.humidity}%</Text>
        </View>
      ) : (
        <Text style={styles.text}>No hay datos disponibles</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});
