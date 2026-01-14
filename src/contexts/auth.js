import React, {createContext, useState, useEffect} from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from 'expo-local-authentication';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        async function loadStogare(){
            const storageUser = await AsyncStorage.getItem('@finToken');

            
            if (storageUser){
                const bioAuth = await LocalAuthentication.authenticateAsync({
                    promptMessage: "Acesse suas finanças",
                    fallbackLabel: "Usar senha"
                });

                if (!bioAuth.success) {
                    setLoading(false);
                    return;
                }
                try {
                    const response = await api.get('/me', {
                        headers:{
                            'Authorization': `Bearer ${storageUser}`
                        }
                    });
                    api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
                    setUser(response.data);
                } catch( error) {
                    console.log("Token inválido ou erro na API");
                    setUser(null)
                    await AsyncStorage.removeItem('@finToken');
                }
            }
            
            setLoading(false);
        }

        loadStogare();
    }, [])

    async function signUp(email, password, nome){
        setLoadingAuth(true);
        try{
            const response = await api.post('/users', {
                name: nome,
                password: password,
                email: email,
            })
            setLoadingAuth(false);
            navigation.goBack();

        } catch(error) {
            console.log("Erro ao cadastrar", error)
            setLoadingAuth(false);
        }
    }

    async function signIn(email, password){
        setLoadingAuth(true);

        try{
            const response = await api.post('/login', {
                email: email,
                password: password
            })

            const {id, name, token} = response.data;

            const data = {
                id,
                name,
                token,
                email,
            };

            await AsyncStorage.setItem('@finToken', token);
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            setUser({
                id,
                name,
                email,
            })
            setLoadingAuth(false);
        } catch(erro){
            console.log("Erro ao logar", erro);
            setLoadingAuth(false);
        }
    }

    async function signOut(){
        await AsyncStorage.clear()
        .then(() => {
            setUser(null);
        })
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, signUp, loadingAuth, signIn, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider; 