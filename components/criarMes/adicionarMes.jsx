import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { router } from "expo-router";

import { createQuilometragemMes, updateMesById, deleteMesById } from "../../db/crud/mes";
import { SIZES, COLORS } from "../../constants";


const CriarNovoMes = (data) => {
    const [mesId, setMesId] = useState(null);
    const [dataMes, setDataMes] = useState("");
    const [quilometragemInicial, setQuilometragemInicial] = useState("");
    const [quilometragemFinal, setQuilometragemFinal] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
  
    const criarMes = async () =>{
        if(mesId==null){
            if(dataMes && quilometragemInicial){
                const newAdd = await createQuilometragemMes(dataMes, quilometragemInicial, quilometragemFinal);
                setMesId(newAdd.mesId);
            }
        }
        else{
            await updateMesById(mesId, dataMes, quilometragemInicial, quilometragemFinal);
        }
    }

    const getAllData = (data) => {
        setMesId(data.mesId);
        setDataMes(data.dataMes);
        setQuilometragemInicial(data.quilometragemInicial);
        setQuilometragemFinal(data.quilometragemFinal);
    }

    useEffect( () => {
        getAllData(data.data);
    },[]);

    return(
        <View style={styles.container}>
            <View style={[styles.adicionarMes, styles.sombra]}>

                <TextInput
                    style={{backgroundColor: COLORS.tertiary}}
                    mode="outlined"
                    label="Data do Mês (MM/AAAA)"
                    value={dataMes}
                    onChangeText={dataMes => setDataMes(dataMes)}
                />
                <View style={styles.difKm}>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.textKm}
                        mode="outlined"
                        label="KM Inicial no Mês"
                        value={quilometragemInicial}
                        onChangeText={quilometragemInicial => setQuilometragemInicial(quilometragemInicial)}
                    />
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.textKm}
                        mode="outlined"
                        label="KM Final no Mês"
                        value={quilometragemFinal}
                        onChangeText={quilometragemFinal => setQuilometragemFinal(quilometragemFinal)}
                    />
                </View>
            
                {
                    (!mesId)?
                        <Button style={styles.botao}  textColor={COLORS.primary}  onPress={() => criarMes()} uppercase={false} mode="elevated">
                            Criar
                        </Button>:

                        <View style={{ marginTop:25 ,flexDirection:"row", gap:10, justifyContent:"space-between"}}>
                            <Button style={styles.botaoCriar}  textColor={COLORS.primary}  onPress={() => criarMes()} uppercase={false} mode="elevated">
                                Salvar
                            </Button>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{fontWeight:"bold", fontSize:SIZES.medium}}>Tem certeza que deseja excluir?</Text>
                                    <Text style={{fontWeight:"bold", fontSize:SIZES.small}}>(está operação não pode ser desfeita)</Text>
                                    
                                    <View style={{flexDirection:"row", width:"110%" , justifyContent:"space-between", marginTop:60}}>
                                        <Button style={styles.botaoCriar}  textColor={COLORS.primary}  onPress={() => setModalVisible(!modalVisible)} uppercase={false} mode="elevated">
                                            Voltar
                                        </Button>
                                        <Button style={styles.botaoDeletar}  textColor={COLORS.primary}  onPress={() => deletarMes(mesId)} uppercase={false} mode="elevated">
                                            Deletar
                                        </Button>

                                    </View>
                                </View>
                            </View>
                            </Modal>
                            <Button style={styles.botaoDeletar}  textColor={COLORS.primary}  onPress={() => setModalVisible(true)} uppercase={false} mode="elevated">
                                deletar
                            </Button>
                        </View>
                }
            </View>
        </View>
    )
}

const irHome = () => {
    router.replace('/')
}
const deletarMes = async (id) => {
    await deleteMesById(id);
    irHome();
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.large,
        gap: SIZES.medium,
    },
    sombra: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    adicionarMes: {   
        gap: SIZES.xSmall,
        padding: SIZES.large,
        borderRadius: SIZES.large,
        backgroundColor: COLORS.tertiary,
    },
    difKm: {
        flex:1, 
        flexDirection:"row", 
        justifyContent: "space-around",
        gap: SIZES.large, 
        alignSelf:"center",
        width: "95%"
    },
    textKm: {
        backgroundColor: COLORS.tertiary, 
        width: "47%"
    },
    botao: {
        width: "50%", alignSelf:"center", 
        backgroundColor:"#4FB477"
    },
    botaoCriar: {
        width: "48%", alignSelf:"center", 
        backgroundColor:"#4FB477"
    },
    botaoDeletar: {
        width: "48%", alignSelf:"center", 
        backgroundColor:"#b44f4f"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default CriarNovoMes;