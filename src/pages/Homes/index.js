import React, { useCallback, useContext, useEffect, useState } from "react";
import { TouchableOpacity, Modal,  View, Text, Image} from 'react-native';

import { Background, ListBalance, Area, Title, List } from './styles';

import api from "../../services/api";
import { format } from "date-fns";

import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Header from "../../components/Header";
import HistoricoList from "../../components/HistoricoList";
import CalendarModal from "../../components/CalendarModal";
import DetailModal from "../../components/DetailModal";


export default function Homes(){
    const isFocused = useIsFocused();
    const [listBalance, setListBalance] = useState([]);
    const [dataMovements, setDataMoviments] = useState(new Date());
    const [moviments, setMoviments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailVisible, setDetailVisible] = useState(false);

    useEffect(() => {
        let isActive = true;
        async function getMovements(){
            let date = new Date(dataMovements)
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, 'dd/MM/yyyy');

            const receives = await api.get('/receives', {
                params: {
                    date: dateFormated
                }
            })

            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if(isActive){
                setMoviments(receives.data)
                setListBalance(balance.data)
            }
        }
        getMovements();
        return () => isActive = false;
    }, [isFocused, dataMovements])

    async function handleDelete( id ){
        try{
            await api.delete('/receives/delete', {
                params: {
                    item_id: id
                }
            })

            setDataMoviments(new Date())
        } catch(erro){
            console.log(erro);
        }
    }

    function filterDateMoviments(dateSelected){
        setDataMoviments(dateSelected);
    }

    function handleShowDetails(item) {
        setSelectedItem(item);
        setDetailModalVisible(true);
    }

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

            <Area>
                <TouchableOpacity onPress={ () => setModalVisible(true) }>
                    <MaterialIcons name="event" color="#121212" size={30} />
                </TouchableOpacity>
                <Title> Ultimas Movimentações</Title>
            </Area>

            <List 
            data={moviments}
            keyExtractor={ item => item.id}
            renderItem={ ({ item }) => ( 
                <TouchableOpacity onPress={() => handleShowDetails(item)}>
                    <HistoricoList 
                        data={item}  
                        deleteItem={handleDelete} 
                        showDetails={ (item) => handleShowDetails(item) }
                    />
                </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20}}
            />

            <Modal
            visible={detailModalVisible}
            animationType="fade"
            transparent={true}
            >
                <DetailModal 
                data={selectedItem}
                setVisible={ () => setDetailModalVisible(false)}
                />
            </Modal>

            <Modal
            visible={modalVisible}
            animationType="fade" 
            transparent={true}
            >
                <CalendarModal 
                setVisible={ () => setModalVisible(false)}
                handleFilter={filterDateMoviments}
                />
            </Modal>

        </Background>
    );
}