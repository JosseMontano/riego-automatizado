import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { getServices } from "../utils/fetch";

interface Data {
  timestamp: string;
  temperature: string;
  humidity: string;
}

export const TableTemperature = () => {
  const [data, setData] = useState([] as Data[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      const resp = await getServices("sensor");
      if (resp?.ok) {
        const res = await resp.json();
        setData(res);
      } else {
        Alert.alert("Ha ocurrido un error");
      }
      setLoading(false);
    };
    handleFetch();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#242424" />
          <Text style={styles.loaderText}>Cargando...</Text>
        </View>
      ) : (
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Fecha</Text>
            <Text style={styles.tableHeaderText}>Valor</Text>
          </View>

          {data.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              ]}
            >
              <Text style={styles.tableCell}>{item.timestamp}</Text>
              <Text style={styles.tableCell}>{item.temperature}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
  },
  tableHeaderText: {
    flex: 1,
    padding: 8,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableRowEven: {
    backgroundColor: "#f9f9f9",
  },
  tableRowOdd: {
    backgroundColor: "#fff",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
