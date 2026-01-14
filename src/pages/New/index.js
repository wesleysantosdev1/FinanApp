import React, {useState} from "react";
import { Background, Input, SubmitButton, SubmitText } from "./styles";

import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import Header from "../../components/Header";
import RegisterTypes from "../../components/RegisterTypes";

import api from '../../services/api';
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import SignatureModal from "../../components/SignatureModal";

export default function New(){
    const navigation = useNavigation();

    const [labelInput, setLabelInput] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [type, setType] = useState('receita');
    const [imgUri, setImgUri] = useState(null);
    const [signatureImg, setSignatureImg] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    


    function handleSignatureSave(signatureB64) {
        setSignatureImg(signatureB64);
        setModalVisible(false);
    }


    function handleSubmit(){
        Keyboard.dismiss();
        if (isNaN(parseFloat(valueInput)) || type === null){
            alert('Preencha todos os campos')
            return;
        }

        Alert.alert(
            'Comfirmando dados',
            `Tipo: ${type} - valor: R$ ${parseFloat(valueInput)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }, 
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )
    }


    function handleImagePicker(){
        Alert.alert(
            "Selecionar Foto",
            "De onde voce deseja escolher a imagem?",
            [
                {
                    text: "Camera",
                    onPress: () => takePhoto()
                }, 
                {
                    text: "Galeria",
                    onPress: () => pickImage(),
                },
                {
                    text: "Cancelar",
                    style: 'cancel'
                }
            ]
        );
    }


    async function pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true, 
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImgUri(result.assets[0].uri);
        }
    }


    async function takePhoto(){
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Você recusou a permissão para acessar a câmera!");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImgUri(result.assets[0].uri);
        }
    }


    async function handleAdd() {
        Keyboard.dismiss();

        try {
            console.log("Enviando dados...");
            const response = await api.post('/receive', {
                description: labelInput,
                value: Number(valueInput),
                type: type,
                date: format(new Date(), 'dd/MM/yyyy'),
                image: imgUri, 
                signature: signatureImg
            });

            console.log("Resposta da API:", response.data);

            setLabelInput('');
            setValueInput('');
            setImgUri(null);
            setSignatureImg(null);
            
            // Use goBack() ou certifique-se que o Home vai recarregar
            navigation.goBack(); 
        } catch (error) {
            console.error("Erro ao registrar:", error.response?.data || error.message);
            Alert.alert("Erro", "Não foi possível registrar. Verifique o tamanho das imagens.");
        }
    }


    return(
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
            <Background>
                <Header 
                title="Registrando"
                />

                <SafeAreaView style={{marginTop: 14, alignItems: 'center'}}>
                    <Input 
                    placeholder="Descrição desse registro"
                    value={labelInput}
                    onChangeText={ (text) => setLabelInput(text)}
                    />

                    <Input 
                    placeholder="Valor desejado"
                    keyboardType="numeric"
                    value={valueInput}
                    onChangeText={ (text) => setValueInput(text)}
                    />

                    <TouchableOpacity
                    onPress={handleImagePicker}
                    style={{ backgroundColor: '#fff', width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 25 }}
                    >
                        <SubmitText
                        style={{ color: '#5e5e5eff' }}
                        >
                            {imgUri ? " Foto selecionada " : "Adicinar foto (Opcional)"}
                        </SubmitText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{ backgroundColor: '#fff', width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 25 }}
                    >
                        <SubmitText style={{ color: '#5e5e5eff', fontSize: 16 }}>
                            {signatureImg ? "Assinatura registrada ✓" : "Coletar Assinatura Digital"}
                        </SubmitText>
                    </TouchableOpacity>

                    {signatureImg && (
                        <Image 
                            source={{ uri: signatureImg }} 
                            style={{ width: 150, height: 80, borderRadius: 8, marginBottom: 10, backgroundColor: '#eee' }}
                            resizeMode="contain"
                        />
                    )}

                    {imgUri && (
                        <Image 
                        source={{ uri: imgUri }} style={{ width: 100, height: 100, borderRadius: 8, marginBottom: 10 }}
                        />
                    )}

                    <RegisterTypes type={type} sendTypeChanged={ ( item ) => setType( item )} />

                    <SubmitButton
                    onPress={handleSubmit}
                    >
                        <SubmitText>Registar</SubmitText>
                    </SubmitButton>

                </SafeAreaView>

                <SignatureModal 
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSave={handleSignatureSave}
                />
            </Background>
        </TouchableWithoutFeedback>
    )
}