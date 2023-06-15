import React, { useState } from "react";
import Stars from "react-native-stars";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const StarRating = ({ initialStars, onChange }) => {
  const [stars, setStars] = useState(initialStars);
  const handleStarRating = (rating) => {
    setStars(rating);
    onChange(rating);
  };

  return (
    <Stars
      default={stars}
      update={handleStarRating}
      count={5}
      half={false}
      starSize={25}
      fullStar={<AntDesign name="star" style={styles.myStarStyle} />}
      halfStar={<AntDesign name="star" style={[styles.myStarStyle]} />}
      emptyStar={<AntDesign name="staro" style={styles.myEmptyStarStyle} />}
    />
  );
};

export default StarRating;

const styles = StyleSheet.create({
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    width: 25,
    fontSize: 25,
  },
  myEmptyStarStyle: {
    color: "gray",
    width: 25,
    fontSize: 25,
  },
});
