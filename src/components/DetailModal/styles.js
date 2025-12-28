import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
`;

export const ModalContent = styled.View`
    flex: 2;
    background-color: #FFF;
    padding: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`;

export const Title = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #121212;
    margin-bottom: 10px;
`;

export const Label = styled.Text`
    font-size: 18px;
    color: #121212;
    margin-bottom: 5px;
`;

export const ValueText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.type === 'despesa' ? '#EF5555' : '#00b94a'};
    margin-bottom: 15px;
`;

export const RegisterImage = styled.Image`
    width: 100%;
    height: 250px;
    border-radius: 10px;
    margin-top: 10px;
`;

export const CloseButton = styled.TouchableOpacity`
    background-color: #3b3dbf;
    width: 100%;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-top: 20px;
`;

export const CloseText = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
`;