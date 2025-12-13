import React, { useCallback, useContext, useState } from "react";
import { View, Text, Button} from "react-native";

import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import { Background } from './styles';

export default function Homes(){
    const [listBalance, setListBalance] = useState([]);


    return(
        <Background>
            <Header 
            title="Minhas Movimentaçõe"
            />
            <Text>Seja bem vindo</Text>
        </Background>
    );
}