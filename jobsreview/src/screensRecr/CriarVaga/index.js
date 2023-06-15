import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Platform, Modal, FlatList } from "react-native";
import { Context } from "../../context/dataContext";
import DeviceInfo from "react-native-device-info";
import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import {
  Container,
  Scroller,
  BackButton,
  Header,
  HeaderInfo,
  HeaderText,
  InputArea,
  TituloAreaClick,
  AreaClick,
  TopAreaClick,
  DescricaoTitulo,
  TextoTitulo,
  PageBody,
  LocationArea,
  LocationInput,
  LocationFinder,
  BotAreaClick,
  TypeArea,
  SkillsArea,
  SkillTitleArea,
  TitleSkill,
  IconSkillAdd,
  ButtonEnviarArea,
  CustomButton,
  CustomButtonText,
  Area,
  ListArea,
  InfoArea,
  UserName,
  StarView,
} from "./styled";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import api from "../../api";
import { useNavigation } from "@react-navigation/native";
import StarRating from "../../components/StarIcon";
import { ModalText } from "../../components/ModalText";
import { ModalHabilidade } from "../../components/ModalHabilidade";

const CriarVaga = ({ route }) => {
  const { state, dispatch } = useContext(Context);
  const [type, setType] = useState("");
  const [locationText, setLocationText] = useState("");
  const [coords, setCoords] = useState(null);
  const [list, setList] = useState([]);
  const navigation = useNavigation();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalTextValues, setModalTextValues] = useState({
    titulo: "",
    empresa: "",
    descricao: "",
  });
  const [selectedField, setSelectedField] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemInfo, setItemInfo] = useState([]);
  Geocoder.init("AIzaSyAyzbZ2Tphtadc13gq6MhBISoxXNXzR1_c");

  useEffect(() => {
    listSkills();
  }, [route]);
  const handleStarsChange = (itemId, stars) => {
    setItemInfo((prevItemInfo) => [...prevItemInfo, { itemId, stars }]);
  };

  const enviarEstrelas = async (vagaId) => {
    try {
      for (let i = 0; i < itemInfo.length; i++) {
        const { itemId, stars } = itemInfo[i];
        const response = await api.post("/vagaskill", {
          idVaga: vagaId,
          skillId: itemId,
          stars: stars,
        });
      }
    } catch (error) {
      console.log(error);
      // Trate o erro adequadamente
    }
  };

  const handleLocationfinder = async () => {
    setCoords(null);
    let result = await request(
      Platform.OS === "ios" && !DeviceInfo.isEmulator()
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
    if (result == "granted" || result == "unavailable") {
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

  const handleBackButton = () => {
    navigation.goBack();
  };

  const RegistrarVaga = async () => {
    try {
      const vagaResponse = await api.post("/vaga/register", {
        name: modalTextValues.titulo,
        type: type,
        empresa: modalTextValues.empresa,
        description: modalTextValues.descricao,
        address: locationText,
        recrutadorId: state.idUser,
      });

      const vagaId = vagaResponse.data.id;
      await enviarEstrelas(vagaId);
      dispatch({ type: "update", payload: true });
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const handleFieldClick = (field) => {
    setSelectedField(field);
    setVisibleModal(true);
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const listSkills = async () => {
    try {
      const response = await api.get("/skill/find");
      const skills = response.data.Skills;

      setList(skills);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Scroller>
        <Header>
          <HeaderInfo>
            <HeaderText>Cadastrar Vaga</HeaderText>
          </HeaderInfo>
          <InputArea>
            <AreaClick onPress={() => handleFieldClick("titulo")}>
              <TopAreaClick>
                <TituloAreaClick>Titulo</TituloAreaClick>
                <AntDesign name="edit" size={24} color="black" />
              </TopAreaClick>

              <DescricaoTitulo>
                <TextoTitulo>{modalTextValues.titulo}</TextoTitulo>
              </DescricaoTitulo>
            </AreaClick>
            <AreaClick onPress={() => handleFieldClick("empresa")}>
              <TopAreaClick>
                <TituloAreaClick>Empresa</TituloAreaClick>
                <AntDesign name="edit" size={24} color="black" />
              </TopAreaClick>

              <DescricaoTitulo>
                <TextoTitulo>{modalTextValues.empresa}</TextoTitulo>
              </DescricaoTitulo>
            </AreaClick>
            <AreaClick onPress={() => handleFieldClick("descricao")}>
              <TopAreaClick>
                <TituloAreaClick>Descrição</TituloAreaClick>
                <AntDesign name="edit" size={24} color="black" />
              </TopAreaClick>

              <DescricaoTitulo>
                <TextoTitulo>{modalTextValues.descricao}</TextoTitulo>
              </DescricaoTitulo>
            </AreaClick>
          </InputArea>
        </Header>
        <PageBody>
          <LocationArea>
            <TopAreaClick>
              <TituloAreaClick>Localização</TituloAreaClick>
            </TopAreaClick>

            <BotAreaClick>
              <LocationInput
                value={locationText}
                onChangeText={(t) => setLocationText(t)}
              />
              <LocationFinder onPress={handleLocationfinder}>
                <Entypo name="location-pin" size={24} color="black" />
              </LocationFinder>
            </BotAreaClick>
          </LocationArea>
          <TypeArea>
            <TopAreaClick>
              <TituloAreaClick>Estilo de trabalho</TituloAreaClick>
            </TopAreaClick>
            <Picker
              style={styles.picker}
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
            >
              <Picker.Item label="Presencial" value="Presencial" />
              <Picker.Item label="Home office" value="Home office" />
              <Picker.Item label="Híbrido" value="Híbrido" />
            </Picker>
          </TypeArea>

          <SkillsArea>
            <SkillTitleArea>
              <TitleSkill>Skills</TitleSkill>
              <IconSkillAdd onPress={handleModalOpen}>
                <AntDesign name="exclamationcircleo" size={24} color="black" />
              </IconSkillAdd>
            </SkillTitleArea>

            <ListArea>
              <FlatList
                data={list}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => {
                  const itemStars = itemInfo[item.id] || 0;

                  return (
                    <Area onPress={() => handleStarsChange(item.id, itemStars)}>
                      <InfoArea>
                        <UserName>{item.name}</UserName>

                        <StarView>
                          <StarRating
                            initialStars={itemStars}
                            onChange={(newStars) =>
                              handleStarsChange(item.id, newStars)
                            }
                          />
                        </StarView>
                      </InfoArea>
                    </Area>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </ListArea>
          </SkillsArea>

          <ButtonEnviarArea>
            <CustomButton onPress={RegistrarVaga}>
              <CustomButtonText>Enviar</CustomButtonText>
            </CustomButton>
          </ButtonEnviarArea>
        </PageBody>

        <Modal
          visible={visibleModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setVisibleModal(false)}
        >
          <ModalText
            handleClose={() => setVisibleModal(false)}
            setValue={setModalTextValues}
            initialValue={modalTextValues}
            selectedField={selectedField}
          />
        </Modal>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <ModalHabilidade
            handleClose={() => {
              setIsModalVisible(false);
            }}
          />
        </Modal>

        <BackButton onPress={handleBackButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </BackButton>
      </Scroller>
    </Container>
  );
};

export default CriarVaga;

const styles = StyleSheet.create({
  inputDescricao: {
    height: 100,
  },
  picker: {
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "lightgray",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    borderWidth: 0,
    height: 40,
    width: 125,
  },

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
