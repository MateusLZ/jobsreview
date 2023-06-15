import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
  background-color: #63c2d1;
  height: 140px;
  width: 100%;
`;

export const PageBody = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 50px;
  margin-top: -50px;
  min-height: 400px;
`;
export const VagaInfoArea = styled.View`
  flex-direction: row;
  margin-top: -30px;
`;

export const VagaInfor = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
export const VagaIcon = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-right: 30px;
  border-width: 4px;
  border-color: #ffffff;
  background-color: gray;
`;
export const VagaName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const VagaType = styled.Text`
  color: #000000;
  font-size: 15px;
`;
export const VagaFavButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border: 2px solid #999999;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const InfoSkillArea = styled.View`
  border-top-color: #cccccc;
  border-top-width: 5px;
  margin-top: 20px;
`;
export const AbilityTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
`;

export const AbilitySkills = styled.View`
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  justify-content: space-between;
`;
export const SoftSkills = styled.View`
  background-color: #d3d3d3;
  border-radius: 15px;
  align-items: center;
  width: 130px;
  height: 50px;
`;
export const SoftName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
`;
export const SoftNivel = styled.Text``;
export const HardSkills = styled.View`
  width: 130px;
  height: 50px;
  background-color: #d3d3d3;
  border-radius: 15px;
  align-items: center;
`;
export const HardName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
`;
export const HardNivel = styled.Text``;

export const DescriptionArea = styled.View`
  margin-top: 40px;
  border-top-color: #cccccc;
  border-top-width: 5px;
`;

export const DescriptionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
`;

export const DescriptionText = styled.Text`
  font-size: 15px;
  text-align: center;
  margin-top: 30px;
  margin-left: 20px;
  text-align: start;
`;

export const AplicationArea = styled.View`
  margin-top: 40px;
  border-top-color: #cccccc;
  border-top-width: 5px;
  flex-direction: row;
  justify-content: space-around;
  align-items: end;
  background-color: rgba(0, 0, 0, 0.5);
`;
export const CustomButton = styled.TouchableOpacity`
  margin-top: 20px;
  height: 30px;
  width: 150px;
  background-color: #2658ab;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const CustomButtonText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  color: #fff;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const Area = styled.TouchableOpacity`
  width: 150px;
  height: 50px;
  background-color: #ffffff;
  margin-bottom: 10px;
`;

export const InfoArea = styled.View`
  width: 100%;
  align-items: center;
`;
export const UserName = styled.Text`
  text-align: center;
  width: 100%;
  font-size: 17px;
  font-weight: bold;
`;
