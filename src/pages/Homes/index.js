import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { Background, ListBalance } from './styles';
import api from "../../services/api";
import { format } from "date-fns";
import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem";

export default function Homes(){
    const isFocused = useIsFocused();
    const [listBalance, setListBalance] = useState([]);
    const [dataMovements, setDataMoviments] = useState(new Date());

    useEffect(() => {
        let isActive = true;
        async function getMovements(){
            let dateFormated = format(dataMovements, 'dd/MM/yyyy');
            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })
            if(isActive){
                setListBalance(balance.data)
            }
        }
        getMovements();
        return () => isActive = false;
    }, [isFocused])

    return(
        <Background>
            <Header 
            title="Minhas Movimentações"
            />
            <ListBalance 
            data={listBalance}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={ item => item.tag}
            renderItem={ ({ item }) => ( <BalanceItem data={item} />)}
            />
        </Background>
    );
}