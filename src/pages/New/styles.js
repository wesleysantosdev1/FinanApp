import styled from "styled-components/native";

export const Background = styled.View`
    flex: 1;
    background-color: #f0f4ff;
`;

export const Input = styled.TextInput`
    height: 50px;
    width: 90%;
    background-color: #fff;
    font-size: 17px;
    padding: 8px;
    margin-bottom: 14px;
    border-radius: 5px;
`;

export const SubmitButton = styled.TouchableOpacity`
    width: 90%;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #1C14D9;
    border-radius: 5px;
`;

export const SubmitText = styled.Text`
    color: #fff;
    font-size: 21px;
    font-weight: bold;
`;