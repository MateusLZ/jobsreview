import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const StarComponent = ({ stars }) => {
  const renderStars = () => {
    const starArray = [];
    for (let i = 0; i < stars; i++) {
      starArray.push(
        <Text key={i}>
          {" "}
          <AntDesign name="star" size={20} color="yellow" />
        </Text>
      );
    }
    return starArray;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>{renderStars()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
  },
});

export default StarComponent;
