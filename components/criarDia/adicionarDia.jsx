import { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button, Divider, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { router } from "expo-router";
import moment from "moment";

import AdicionarEntrada from "./adicionarEntrada";
import AdicionarSaida from "./adicionarSaida";
import { createDia, updateDiaById, deleteDiaById } from "../../db/crud/dia";
import { SIZES, COLORS } from "../../constants";


const CriarNovoDia = (data) => {
    const [diaId, setDiaId] = useState(null);
    const [kmRodado, setKmRodado] = useState("");
    const [kmInicial, setKmInicial] = useState("");
    const [kmFinal, setKmFinal] = useState("");
    const [dateAux, setDateAux] = useState("");
    const [date, setDate] = useState("");
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  
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

    const criarDia = async () =>{
        if(diaId==null){
            if(dateAux && (kmRodado || (kmInicial && kmFinal))){
                var diferenca = "";

                if(!kmRodado){
                    diferenca = String( Number(kmFinal) - Number(kmInicial) );
                    setKmRodado(diferenca);
                }

                const newAdd = await createDia( String(moment(date).format("DD/MM/YYYY")), (kmRodado)? kmRodado : diferenca);
                setDiaId(newAdd.diaId);
            }
        }
        else{
            await updateDiaById( diaId, dateAux, kmRodado);
        }
    };

    const deletarDia = async (id) => {
        await deleteDiaById(id);
        irHome();
    }

    const getAllData = (data) => {
        setDiaId(data.diaId);
        setKmRodado(data.km);
        setDateAux(data.data);
    }

    useEffect(  () => {
        getAllData(data.data);
    },[]);

    return(
        <View style={styles.container}>
            <View style={[styles.adicionarDia, styles.sombra]}>
                
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

                <Divider/>
                
                <View style={styles.difKm}>
                    <TextInput
                        keyboardType="number-pad"
                        mode="outlined"
                        label="Km inicial"
                        value={kmInicial}
                        style={styles.textKm}
                        onChangeText={kmInicial => setKmInicial(kmInicial)}
                    />
                    <TextInput
                        keyboardType="number-pad"
                        mode="outlined"
                        label="Km final"
                        value={kmFinal}
                        style={styles.textKm}
                        onChangeText={kmFinal => setKmFinal(kmFinal)}
                    />
                </View>
                <Text style={{fontWeight:"bold", textAlign:"center"}}>OU</Text>
                <TextInput
                    keyboardType="number-pad"
                    mode="outlined"
                    label="Km rodado"
                    value={kmRodado}
                    style={{backgroundColor: COLORS.tertiary}}
                    onChangeText={kmRodado => setKmRodado(kmRodado)}
                />

                <Divider/>
                
                {
                    (!diaId)?
                        <Button style={styles.botao}  textColor={COLORS.primary}  onPress={() => criarDia()} uppercase={false} mode="elevated">
                            Criar
                        </Button>:

                        <View style={{ marginTop:25 ,flexDirection:"row", gap:10, justifyContent:"space-between"}}>
                            <Button style={styles.botaoCriar}  textColor={COLORS.primary}  onPress={() => criarDia()} uppercase={false} mode="elevated">
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
                                        <Button style={styles.botaoDeletar}  textColor={COLORS.primary}  onPress={() => deletarDia(diaId)} uppercase={false} mode="elevated">
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
            {
                (diaId!=null)?
                    <View style={[styles.addEntSai, styles.sombra]}>
                        <AdicionarEntrada id={diaId}/>
                        <AdicionarSaida id={diaId}/>
                    </View>:
                    <View>
                        <Text> </Text>
                    </View>
            }
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
    adicionarDia: {   
        gap: SIZES.xSmall,
        padding: SIZES.large,
        borderRadius: SIZES.large,
        backgroundColor: COLORS.tertiary,
    },
    dataText: {
        fontWeight: "bold", 
        fontSize: SIZES.medium, margin: 
        SIZES.xSmall
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
    addEntSai: {
        flex: 1, 
        flexDirection: 'row', 
        gap: SIZES.xxSmall, 
        marginTop: SIZES.xxSmall,
        padding: SIZES.xxSmall,
        borderRadius: SIZES.large,
        backgroundColor: COLORS.tertiary, 
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

export default CriarNovoDia;