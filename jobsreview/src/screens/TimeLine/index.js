import { FlatList, Platform, RefreshControl } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import DeviceInfo from "react-native-device-info";
import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../../context/dataContext.js";
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
  Area,
  Icon,
  InfoArea,
  UserName,
  VerPerfilBotao,
  VerPerfilBotaoText,
  Tipo,
} from "./styles";
import { AntDesign, Entypo } from "@expo/vector-icons";
import api from "../../api";

const TimeLine = ({ navigation }) => {
  const [locationText, setLocationText] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [appliedVagas, setAppliedVagas] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const { state, dispatch } = useContext(Context);

  Geocoder.init("AIzaSyAyzbZ2Tphtadc13gq6MhBISoxXNXzR1_c");

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
      Geolocation.getCurrentPosition((info) => {
        setCoords(info.coords);
        let lat = null;
        let lng = null;
        if (info) {
          lat = info.coords.latitude;
          lng = info.coords.longitude;
        }
        Geocoder.from(lat, lng)
          .then((response) => {
            const results = response.results;
            if (results.length > 0) {
              for (let i = 0; i < results.length; i++) {
                const addressComponents = results[i].address_components;
                for (let j = 0; j < addressComponents.length; j++) {
                  const types = addressComponents[j].types;
                  if (types.includes("locality")) {
                    const city = addressComponents[j].long_name;
                    AsyncStorage.setItem("location", city);
                    setLocationText(city);

                    // Verificar se vagas não está vazio antes de chamar checkIfApplied
                    if (list.length > 0) {
                      checkIfApplied(list);
                    }

                    return;
                  }
                }
              }
            }
          })
          .catch((error) => {
            console.error("Erro ao obter o endereço:", error);
          });
      });
    }
  };

  const getVagas = async () => {
    setLoading(true);

    try {
      const res = await api.get("/vaga/find");

      const location = await AsyncStorage.getItem("location");

      if (res.error != "undefined") {
        if (location) {
          setLocationText(location);
        }

        const result = res.data.Vagas;
        if (result) {
          checkIfApplied(result);
          setList(result);
        }
      } else {
        console.log(`Error: ${res.error}`);
      }
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }
  };
  const checkIfApplied = async (vagas) => {
    try {
      const filteredVagas = [];
      for (const vaga of vagas) {
        const response = await api.get(
          `/candidatura/${vaga.id}/${state.idUser}`
        );
        const candidatura = response.data;
        if (candidatura) {
          setAppliedVagas((prevAppliedVagas) => [...prevAppliedVagas, vaga]);
        }
        if (candidatura.success === false) {
          setAppliedVagas((prevAppliedVagas) =>
            prevAppliedVagas.filter((appliedVaga) => appliedVaga.id !== vaga.id)
          );
          filteredVagas.push(vaga);
        }
      }
      setList(filteredVagas);
    } catch (error) {
      console.error("Erro ao verificar candidatura:", error);
    }
    setLoadingComplete(true);

    setLoading(false);
  };

  useEffect(() => {
    getVagas();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getVagas();
  };

  const viewVaga = async (item) => {
    await dispatch({ type: "setVaga", payload: item });

    // Adicionar a vaga aplicada ao estado appliedVagas
    setAppliedVagas([...appliedVagas, item]);

    navigation.navigate("Vaga", item);
  };

  return (
    <Container>
      <Scroller
        RefreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Encontre a sua vaga </HeaderTitle>
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
          <LocationFinder onPress={handleLocationfinder}>
            <Entypo name="location-pin" size={24} color="black" />
          </LocationFinder>
        </LocationArea>
        {loading && <LoadingIcon size="large" color="#FFF" />}

        <ListArea>
          {loadingComplete && ( // Verifica se o carregamento está completo antes de renderizar o componente
            <FlatList
              data={list}
              renderItem={({ item }) => {
                return (
                  <Area onPress={() => viewVaga(item)}>
                    <Icon>
                      <AntDesign
                        name="iconfontdesktop"
                        size={50}
                        color="black"
                      />
                    </Icon>
                    <InfoArea>
                      <UserName>{item.name}</UserName>

                      <Tipo>{` ${item.type}  |  ${item.address}`}</Tipo>

                      <VerPerfilBotao>
                        <VerPerfilBotaoText>Ver Vaga</VerPerfilBotaoText>
                      </VerPerfilBotao>
                    </InfoArea>
                  </Area>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          )}
        </ListArea>
      </Scroller>
    </Container>
  );
};

export default TimeLine;
