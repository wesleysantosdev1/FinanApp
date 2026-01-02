import React, {useContext, useState} from "react";
import { Alert, Platform, ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/auth";

import {
    Background, 
    Container, 
    AreaInput, 
    Input, 
    SubmitButton, 
    SubmitText, 
    Logo,
} from '../SignIn/styles'

export default function SignUp(){
    const {signUp, loadingAuth} = useContext(AuthContext)
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp(){
        console.log("")
        if(nome === '' || email === '' || password === '') return
        signUp(email, password, nome);
    }

    return(
        <Background>
        
            <Container
            behavior={Platform.OS === "ios" ? 'padding' : ''}
            enabled
            >

                <Logo 
                source={require('../../assets/Logo.png')}
                />

            <AreaInput>
                <Input 
                placeholder="Seu Nome"
                value={nome}
                onChangeText={ (text) => setNome(text)}
                />
            </AreaInput>

            <AreaInput>
                <Input 
                placeholder="Seu email"
                value={email}
                onChangeText={ (text) => setEmail(text)}
                />
            </AreaInput>

            <AreaInput>
                <Input 
                placeholder="Sua senha"
                value={password}
                onChangeText={ (text) => setPassword(text)}
                secureTextEntry={true}
                />
            </AreaInput>

            <SubmitButton 
            activeOpacity={0.8}
            onPress={handleSignUp}
            >
                {
                    loadingAuth ? (
                        <ActivityIndicator size={20} color="#fff" />
                    ) : (
                        <SubmitText>Cadastrar</SubmitText>
                    )
                }
            </SubmitButton>

            </Container>
        </Background>
    )
}