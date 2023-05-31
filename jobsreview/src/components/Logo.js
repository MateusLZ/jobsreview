import React from "react";
import { Image } from "react-native";

const Logo = () => {
  return (
    <Image
      source={require("../assets/images/logo.png")}
      resizeMode="contain"
      style={{ width: "100%", height: 160 }}
    />
  );
};

export default Logo;
