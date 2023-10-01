import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, DataTable, Divider, IconButton, TextInput } from 'react-native-paper';

import { createSaidaValor, getAllSaidasByDiaId, deleteSaidaById } from "../../db/crud/saida";
import { COLORS, SIZES, icons } from "../../constants";

const AdicionarSaida = (data) => {
    const idDia = data.id;
    const [saidas, setSaidas] = useState([]);
    const [desc, setDesc] = useState("");
    const [custo, setCusto] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const criarSaida = async (custo, desc, idDia) => {
        if(custo && desc && idDia){
            await createSaidaValor(custo, desc, idDia);
            setSaidas(await getAllSaidasByDiaId(idDia));
            setDesc("");
            setCusto("");
        }
    };
    
    const deletarSaida = async (id) => {
        await deleteSaidaById(id);
        const data = await getAllSaidasByDiaId(idDia);
        setSaidas(data);
        setModalVisible(!modalVisible);
    };

    const getSaidas = async (id) => {
        setSaidas(await getAllSaidasByDiaId(id));
    };
    
    useEffect(() => {
        getSaidas(Number(idDia));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}> GASTOS </Text>
            <ScrollView horizontal>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.rowGrande}>Desc</DataTable.Title>
                    <DataTable.Title style={styles.rowPequena}>Valor</DataTable.Title>
                    <DataTable.Title style={styles.rowMedia}></DataTable.Title>
                </DataTable.Header>
                {
                    saidas.map(saida =>{
                        return (
                            <DataTable.Row key={saida.saidaId}>
                                <DataTable.Cell style={styles.rowGrande}>{saida.descricao}</DataTable.Cell>
                                <DataTable.Cell style={styles.rowPequena}>{saida.valor}</DataTable.Cell>

                                <View>
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
                                                <Button style={styles.botaoDeletar}  textColor={COLORS.primary}  onPress={() => deletarSaida(saida.saidaId)} uppercase={false} mode="elevated">
                                                    Deletar
                                                </Button>

                                            </View>
                                        </View>
                                    </View>
                                    </Modal>
                                    <IconButton 
                                        icon={icons.deleteIcon}
                                        iconColor={COLORS.primary}
                                        onPress={()=> setModalVisible(true)}
                                    />
                                </View>
                            </DataTable.Row>
                        )
                    })
                }
            </DataTable>
            </ScrollView>

            <Divider style={styles.divisor}/>

            <TextInput
                style={styles.textoInput}
                mode="outlined"
                label="Descricao"
                value={desc}
                onChangeText={desc => setDesc(desc)}
            />
            <TextInput
                keyboardType="number-pad"
                style={styles.textoInput}
                mode="outlined"
                label="Valor"
                value={custo}
                onChangeText={custo => setCusto(custo)}
            />
            <Button style={styles.botao} onPress={() => criarSaida(custo, desc, idDia)} uppercase={false} mode="outlined">
                Adicionar
            </Button>
        </View>
  )
}

const styles = StyleSheet.create({
    botao: {
        alignSelf: "center",
        width: "75%",
    },
    container: {
        flex:1,
        paddingBottom: SIZES.large,
        flexDirection: 'column'
    },
    divisor: {
        margin: SIZES.xSmall,
    },
    rowPequena: {
        maxWidth:"30%",
        minWidth:"30%",
    },
    rowMedia: {
        maxWidth:"20%",
        minWidth:"20%",
    },
    rowGrande: {
        maxWidth:"45%",
        minWidth:"45%",
    },
    textoInput: {
        margin: SIZES.xSmall,
        backgroundColor: COLORS.tertiary,
    },
    titulo: {
        textAlign: "center",
        fontWeight: "bold",
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

export default AdicionarSaida