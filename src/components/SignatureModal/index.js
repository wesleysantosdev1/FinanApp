import React, { useRef } from "react";
import {Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

export default function SignatureModal({ visible, onClose, onSave }){
    const signatureRef = useRef();

    const handleOk = (signature) => {
        onSave(signature)
    };

    const handleSave = () => {
        signatureRef.current.readSignature();
    };

    const handleClear = () => {
        signatureRef.current.clearSignature();
    }

    const webStyle = `
        .m-signature-pad--footer { display: none; margin: 0px; }
        body, html { height: 100%; }
    `;

    return(
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.container}> 
                <View style={styles.header}>
                    <Text style={styles.title}> Assinatura Digital</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    <SignatureScreen
                    ref={signatureRef}
                    onOK={handleOk}
                    descriptionText="Assine para comfirmar a entrega"
                    webStyle={webStyle}
                    />
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btnEmpty} onPress={handleClear}>
                        <Text style={styles.btnTextBlack}>Limpar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnConfirm} onPress={handleSave}>
                        <Text style={styles.btnTextWhite}>Comfirmar Assinatura</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: { 
        flex: 1, backgroundColor: '#F0F4FF' 
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },

    title: { 
        fontSize: 18, fontWeight: 'bold', color: '#121212' 
    },

    closeText: { 
        color: 'red', fontWeight: 'bold' 
    }, 

    footer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        gap: 10
    },
    btnEmpty: {
        flex: 1,
        height: 50,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },

    btnConfirm: {
        flex: 2,
        height: 50,
        backgroundColor: '#1C14D9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    btnTextWhite: { 
        color: '#fff', fontWeight: 'bold', fontSize: 16 
    },

    btnTextBlack: { 
        color: '#000', fontWeight: 'bold', fontSize: 16 
    }
});