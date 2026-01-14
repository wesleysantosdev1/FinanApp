import React from "react";
import { TouchableWithoutFeedback, View, ScrollView, Text } from "react-native";
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title>Detalhes do Registro</Title>
                    
                    <Label>Descrição: {data?.description}</Label>
                    
                    <ValueText type={data?.type}>
                        {data?.type === 'despesa' ? '- ' : '+ '}
                        R$ {data?.value ? data.value.toFixed(2).replace('.', ',') : '0,00'}
                    </ValueText>

                    {/* Exibição da Foto (Câmera ou Galeria) */}
                    {data?.image && (
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', color: '#121212', marginBottom: 8 }}>
                                Foto do Comprovante:
                            </Text>
                            <RegisterImage 
                                source={{ uri: data.image }}
                                resizeMode="cover"
                            />
                        </View>
                    )}

                    {/* Exibição da Assinatura Digital */}
                    {data?.signature && (
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', color: '#121212', marginBottom: 8 }}>
                                Assinatura Digital:
                            </Text>
                            <RegisterImage 
                                source={{ uri: data.signature }}
                                resizeMode="contain"
                                style={{ 
                                    backgroundColor: '#F9F9F9', // Fundo claro para destacar o traçado preto
                                    borderWidth: 1,
                                    borderColor: '#EEEEEE',
                                    height: 120 // Altura fixa para assinaturas
                                }}
                            />
                        </View>
                    )}

                    <CloseButton onPress={setVisible} style={{ marginTop: 25 }}>
                        <CloseText>Fechar Detalhes</CloseText>
                    </CloseButton>
                </ScrollView>
            </ModalContent>
        </Container>
    );
}