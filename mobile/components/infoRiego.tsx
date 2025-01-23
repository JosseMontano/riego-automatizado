import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { getServices } from "../utils/fetch";

interface Data {
  timestamp: string;
  temperature: string;
  humidity: string;
}

interface ErrorsData {
  sensorTemperatura: string;
  fecha: string;
}

/* 
  {
      "_id": "6791618d665c6a43302c717a",
      "sensorTemperatura": "fallando",
      "fecha": "17:25:46",
      "__v": 0
    } */

export const InfoRiego = () => {
  const [data, setData] = useState<Data | null>(null);
  const [errorsData, setErrorsData] = useState<ErrorsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const resp = await getServices("sensor");
        if (resp?.ok) {
          const res = await resp.json();
          if (Array.isArray(res.sensors) && res.sensors.length > 0) {
            setData(res.sensors[res.sensors.length - 1]); // Obtiene el último valor del array.
            setErrorsData(res.errors[0]);
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
          <Text style={[styles.text, styles.title]}>Ultimos datos</Text>
          <View style={styles.container}>
          <Text style={styles.text}>Fecha: {data.timestamp}</Text>
          <Text style={styles.text}>Temperatura: {data.temperature}°C</Text>
          <Text style={styles.text}>Humedad: {data.humidity}%</Text>
          </View>

          <Text style={[styles.text, styles.title]}>Estado de los dispositivos</Text>
          <View style={styles.container}>
          <Text style={styles.text}>Temperatura: {errorsData?.sensorTemperatura == "Funcionando" ? "✅" : "⛔"}</Text>
          <Text style={styles.text}>Fecha: {errorsData?.fecha}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.text}>No hay datos disponibles</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 0,
    paddingBottom:3,
  },
  title:{
    fontWeight:"600",
    color:"#000",
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
    color: "#5a5a5a",
  },
});
