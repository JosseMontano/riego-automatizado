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
import { TableHumidity } from "../components/tableHumidity";
import { TableTemperature } from "../components/tableTemperature";
import { InfoRiego } from "../components/infoRiego";

const LoginScreen = () => {
  type featureType = "Tiempo-Real" | "Temperatura" | "Humedad";
  const [feature, setFeature] = useState<featureType>("Tiempo-Real");
  const handleFeature = (val: featureType) => {
    setFeature(val);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerFeatures}>
        <TouchableOpacity
          onPress={() => handleFeature("Tiempo-Real")}
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
                backgroundColor: feature == "Tiempo-Real" ? primaryColor : "#f5f5f5",
                color: feature == "Tiempo-Real" ? "#f5f5f5" : "#000",
              },
            ]}
          >
            Tiempo Real
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

        {feature == "Tiempo-Real" && <InfoRiego />}
        {feature == "Temperatura" && <TableTemperature />}
        {feature == "Humedad" && <TableHumidity />}
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
