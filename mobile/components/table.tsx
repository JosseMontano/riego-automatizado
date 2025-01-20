import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface Params {
  data: any[];
}

export const Table = ({ data }: Params) => {
  return (
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
          <Text style={styles.tableCell}>{item.date}</Text>
          <Text style={styles.tableCell}>{item.val}</Text>
        </View>
      ))}
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


