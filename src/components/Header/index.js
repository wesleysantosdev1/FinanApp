import React from "react";
import  Icon  from "react-native-vector-icons/Feather";
import { Conatiner, Title, ButtonMenu } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Header({title}){
    const navigation = useNavigation();
    return(
        <Conatiner>
            <ButtonMenu onPress={ () => navigation.openDrawer()}>
                <Icon name="menu" size={35} color="#121212" />
            </ButtonMenu>

            { title && (
                <Title> {title} </Title>
            )}
        </Conatiner>
    )
}