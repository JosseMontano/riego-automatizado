import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text } from "react-native-paper";
import { getServices } from "../utils/fetch";

interface Data {
  timestamp: string;
  temperature: string;
  humidity: string;
}

export const TableHumidity = () => {
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
    <View>
      {loading && <Text>Cargando</Text>}
      {!loading && (
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
              <Text style={styles.tableCell}>{item.humidity}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
