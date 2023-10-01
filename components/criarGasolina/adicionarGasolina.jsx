import { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { router } from "expo-router";
import moment from "moment";

import { createGasolina, updateGasolinaById, deleteGasolinaById } from "../../db/crud/gasolina";
import { SIZES, COLORS } from "../../constants";


const CriarNovaGasolina = (data) => {
    const [gasolinaId, setGasolinaId] = useState(null);
    const [date, setDate] = useState("");
    const [dateAux, setDateAux] = useState("");
    const [kmAtual, setKmAtual] = useState("");
    const [kmFinal, setKmFinal] = useState("");
    const [litros, setLitros] = useState("");
    const [precoTotal, setPrecoTotal] = useState("");
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  
    const criarGasolina = async () =>{
        if(gasolinaId==null){
            if(date && kmAtual && litros && precoTotal){
                const newAdd = await createGasolina(dateAux, kmAtual, kmFinal, litros, precoTotal);
                setGasolinaId(newAdd.gasolinaId);
            }
        }
        else{
            await updateGasolinaById(gasolinaId, dateAux, kmAtual, kmFinal, litros, precoTotal);
        }
    }

    const deletarGasolina = async (id) => {
        await deleteGasolinaById(id);
        irHome();
    }
    
    const onDismissSingle = useCallback(() => {
        setOpen(false);
      }, [setOpen]);
    
    const onConfirmSingle = useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
            setDateAux(String(moment(params.date).format("DD/MM/YYYY")));
        },
        [setOpen, setDate]
    );

    const getAllData = (data) => {
        setGasolinaId(data.gasolinaId);
        setDateAux(data.date);
        setKmAtual(data.kmAtual);
        setKmFinal(data.kmFinal);
        setLitros(data.litros);
        setPrecoTotal(data.precoTotal);
    }

    useEffect( () => {
        getAllData(data.data);
    },[]);

    return(
        <View style={styles.container}>
            <View style={[styles.adicionarMes, styles.sombra]}>
                <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                    Selecione a data
                </Button>
                <DatePickerModal
                    locale="pt"
                    mode="single"
                    visible={open}
                    onDismiss={onDismissSingle}
                    date={date}
                    onConfirm={onConfirmSingle}
                />
                <View>
                    <Text style={styles.dataText}>
                        {dateAux?
                        <Text>Data: {dateAux}</Text>:
                        <Text>Nenhuma data foi selecionada</Text>
                        }
                    </Text>
                </View>

                <View style={styles.difKm}>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.textKm}
                        mode="outlined"
                        label="KM Atual"
                        value={kmAtual}
                        onChangeText={kmAtual => setKmAtual(kmAtual)}
                    />
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.textKm}
                        mode="outlined"
                        label="KM Final"
                        value={kmFinal}
                        onChangeText={kmFinal => setKmFinal(kmFinal)}
                    />
                </View>

                <TextInput
                    style={{backgroundColor: COLORS.tertiary}}
                    keyboardType="number-pad"
                    mode="outlined"
                    label="Litros Abastecidos"
                    value={litros}
                    onChangeText={litros => setLitros(litros)}
                />
                
                <TextInput
                    style={{backgroundColor: COLORS.tertiary}}
                    keyboardType="number-pad"
                    mode="outlined"
                    label="Preço Total"
                    value={precoTotal}
                    onChangeText={precoTotal => setPrecoTotal(precoTotal)}
                />
                {
                    (!gasolinaId)?
                        <Button style={styles.botaoCriar}  textColor={COLORS.primary}  onPress={() => criarGasolina()} uppercase={false} mode="elevated">
                            Criar
                        </Button>:

                        <View style={{ marginTop:25 ,flexDirection:"row", gap:10, justifyContent:"space-between"}}>
                            <Button style={styles.botaoCriar}  textColor={COLORS.primary}  onPress={() => criarGasolina()} uppercase={false} mode="elevated">
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
                                        <Button style={styles.botaoDeletar}  textColor={COLORS.primary}  onPress={() => deletarGasolina(gasolinaId)} uppercase={false} mode="elevated">
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
    dataText: {
        fontWeight: "bold", 
        fontSize: SIZES.medium, margin: 
        SIZES.xSmall
    },
    textKm: {
        backgroundColor: COLORS.tertiary, 
        width: "49%"
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

export default CriarNovaGasolina;