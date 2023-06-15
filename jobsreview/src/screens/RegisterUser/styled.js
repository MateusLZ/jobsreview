import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  background-color: #283593;
  justify-content: flex-end;
  flex: 1;
`;

export const InputArea = styled.View`
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
`;
export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  background-color: #2658ab;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
export const SignMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;
export const SignMessageButtonText = styled.Text`
  font-size: 16px;
  color: #268596;
`;
export const SignMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: #268596;
  font-weight: bold;
  margin-left: 5px;
`;
