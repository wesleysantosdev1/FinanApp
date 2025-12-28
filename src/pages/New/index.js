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

export default function New(){
    const navigation = useNavigation();

    const [labelInput, setLabelInput] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [type, setType] = useState('receita');
    const [imgUri, setImgUri] = useState(null);

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

    async function handleAdd() {
        Keyboard.dismiss();

        await api.post('/receive', {
            description: labelInput,
            value: Number(valueInput),
            type: type,
            date: format(new Date(), 'dd/MM/yyyy')
        })

        setLabelInput('');
        setValueInput('');
        navigation.navigate('Home')
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
                    onPress={pickImage}
                    style={{ backgroundColor: '#fff', width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 25 }}
                    >
                        <SubmitText
                        style={{ color: '#5e5e5eff' }}
                        >
                            {imgUri ? " Foto selecionada " : "Adicinar foto (Opcional)"}
                        </SubmitText>
                    </TouchableOpacity>

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
            </Background>
        </TouchableWithoutFeedback>
    )
}