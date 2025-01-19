import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { primaryColor } from "../constants/styles";

const LoginScreen = () => {
  type featureType = "Riego" | "Temperatura" | "Humedad";
  const [feature, setFeature] = useState<featureType>("Riego");
  const handleFeature = (val: featureType) => {
    setFeature(val);
  };

  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    gap: 20,
    padding: 15,
  },
  containerFeatures: {
    flexDirection: "row",
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
