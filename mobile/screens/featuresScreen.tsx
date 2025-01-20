import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { primaryColor } from "../constants/styles";
import { Table } from "../components/table";

const LoginScreen = () => {
  type featureType = "Riego" | "Temperatura" | "Humedad";
  const [feature, setFeature] = useState<featureType>("Riego");
  const handleFeature = (val: featureType) => {
    setFeature(val);
  };

  const data1 = [
    { date: "John Doe", val: "Temp1" },
    { date: "Jane Smith", val: "Temp2" },
    { date: "Sam Johnson", val: "Temp3" },
  ];

  const data2 = [
    { date: "John Doe", val: "Temp11" },
    { date: "Jane Smith", val: "Temp22" },
    { date: "Sam Johnson", val: "Temp33" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerFeatures}>
        <TouchableOpacity
          onPress={() => handleFeature("Riego")}
          style={styles.features}
        >
          <Image
            source={require("../assets/manguera.png")}
            style={styles.image}
          />
          <Text
            style={[
              styles.featureText,
              {
                backgroundColor: feature == "Riego" ? primaryColor : "#f5f5f5",
                color: feature == "Riego" ? "#f5f5f5" : "#000",
              },
            ]}
          >
            Riego
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleFeature("Temperatura")}
          style={styles.features}
        >
          <Image
            source={require("../assets/temperatura.png")}
            style={styles.image}
          />
          <Text
            style={[
              styles.featureText,
              {
                backgroundColor:
                  feature == "Temperatura" ? primaryColor : "#f5f5f5",
                color: feature == "Temperatura" ? "#f5f5f5" : "#000",
              },
            ]}
          >
            Temperatura
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleFeature("Humedad")}
          style={styles.features}
        >
          <Image
            source={require("../assets/humedad.png")}
            style={styles.image}
          />
          <Text
            style={[
              styles.featureText,
              {
                backgroundColor:
                  feature == "Humedad" ? primaryColor : "#f5f5f5",
                color: feature == "Humedad" ? "#f5f5f5" : "#000",
              },
            ]}
          >
            Humedad
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerContent}>
        <Text style={styles.title}>{feature}</Text>

        {feature == "Riego" && (
          <View>
            <Text>hola</Text>
          </View>
        )}
        {feature == "Temperatura" && <Table data={data1} />}
        {feature == "Humedad" && <Table data={data2} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    gap: 20,
    padding: 15,
  },
  containerFeatures: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  features: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
  featureText: {
    borderRadius: 5,
    padding: 7,
  },
  containerContent: {
    width: "100%",
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default LoginScreen;
