import { Platform, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import DeviceInfo from "react-native-device-info";
import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import VagasItem from "../../components/VagasItem.js";

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea,
} from "./styles";
import { AntDesign, Entypo } from "@expo/vector-icons";

import api from "../../api";

const TimeLine = ({ navigation }) => {
  const [locationText, setLocationText] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const handleLocationfinder = async () => {
    setCoords(null);
    let result = await request(
      Platform.OS === "ios" && !DeviceInfo.isEmulator()
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
    if (result == "granted" || result == "unavailable") {
      setLoading(true);
      setLocationText("");
      setList([]);
      Geolocation.getCurrentPosition((info) => {
        setCoords(info.coords);
        getVagas();
        console.log(info);
      });
    }
  };
  const getVagas = async () => {
    setLoading(true);
    setList([]);

    try {
      const res = await api.get("/vagas");

      if (res.error != "undefined") {
        if (res.loc) {
          setLocationText(res.loc);
        }
        setList(res.data);
      } else {
        console.log(`Error: ${res.error}`);
      }
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getVagas();
  }, []);

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Encontre a sua vaga</HeaderTitle>
          <SearchButton onPress={() => navigation.navigate("Pesquisa")}>
            <AntDesign name="search1" size={24} color="#FFFFFF" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#FFFFFF"
            value={locationText}
            onChangeText={(t) => setLocationText(t)}
          />
          {console.log(locationText)}
          <LocationFinder onPress={handleLocationfinder}>
            <Entypo name="location-pin" size={24} color="black" />
          </LocationFinder>
        </LocationArea>
        {loading && <LoadingIcon size="large" color="#FFF" />}

        <ListArea>
          {list.map((item, k) => (
            <VagasItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};

export default TimeLine;
