import React from "react";
import { Image } from "react-native";

const ClienteImg = () => {
  return (
    <Image
      source={require("../assets/images/cliente.png")}
      resizeMode="contain"
      style={{ width: "100%", height: 250 }}
    />
  );
};

export default ClienteImg;
