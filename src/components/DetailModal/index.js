import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { 
    Container, 
    ModalContent, 
    Title, 
    Label, 
    ValueText, 
    RegisterImage, 
    CloseButton, 
    CloseText 
} from "./styles";

export default function DetailModal({ data, setVisible }){
    return(
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>

            <ModalContent>
                <Title>Detalhes do Registro</Title>
                
                <Label>Descrição: {data?.description}</Label>
                
                <ValueText type={data?.type}>
                    {data?.type === 'despesa' ? '- ' : '+ '}
                    R$ {data?.value.toFixed(2).replace('.', ',')}
                </ValueText>

                {data?.image && (
                    <RegisterImage 
                        source={{ uri: data.image }}
                        resizeMode="cover"
                    />
                )}

                <CloseButton onPress={setVisible}>
                    <CloseText>Fechar</CloseText>
                </CloseButton>
            </ModalContent>
        </Container>
    );
}