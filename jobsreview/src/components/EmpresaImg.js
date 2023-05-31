import React from "react";
import { Image } from "react-native";

const EmpresaImg = () => {
  return (
    <Image
      source={require("../assets/images/Empresa.png")}
      resizeMode="contain"
      style={{ width: "100%", height: 300 }}
    />
  );
};

export default EmpresaImg;
