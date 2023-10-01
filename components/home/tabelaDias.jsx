import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { Button, DataTable, IconButton } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import { router } from "expo-router";

import { COLORS , SIZES, icons } from "../../constants";
import { getAllDias } from "../../db/crud/dia";
import { getAllEntradas } from "../../db/crud/entrada";
import { getAllSaidas } from "../../db/crud/saida";


const TabelaDias = () => {
    const [dias, setDias] = useState([]);
    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);

    const getAllData = async () =>{
        setDias(await getAllDias())
        setEntradas(await getAllEntradas())
        setSaidas(await getAllSaidas())
    }

    useEffect(() => {
        getAllData()
    },[])

    return (
        <View style={[styles.container, styles.sombra]}>
            <View style={{flex:1, flexDirection:"row", justifyContent: "space-between"}}>
                <View>
                    <Text style={{width:"75%", alignSelf:"center", fontWeight:"bold", fontSize: SIZES.large}}>Resumo Por Dia</Text>
                </View>
                <View>
                    <Button icon="plus-circle" mode="text" textColor={COLORS.primary} style={{ paddingVertical:10 }} onPress={() => irAddDia()}>NOVO</Button>
                </View>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.rowGrande}>Data</DataTable.Title>
                    <DataTable.Title style={styles.rowPequena}>KM</DataTable.Title>
                    <DataTable.Title style={styles.rowPequena}>Total</DataTable.Title>
                    <DataTable.Title numeric style={styles.rowMedia}></DataTable.Title>
                </DataTable.Header>
                <ScrollView style={{height:240}}>
                    {
                        dias.map((dia, index) =>{
                            var entradasById = entradas.filter(entrada => entrada.diaId == dia.diaId);
                            var valorEntrada = entradasById.reduce(function (soma, entrada) {
                                return soma + Number(entrada.valor)
                            }, 0)
                            var saidasById = saidas.filter(saida => saida.diaId == dia.diaId);
                            var valorSaida = saidasById.reduce(function (soma, saida) {return soma + Number(saida.valor)}, 0)

                            var rowStyle = {
                                backgroundColor: COLORS.gray,
                                borderRadius: 10
                            }
                            if(index%2==0){
                                rowStyle.backgroundColor = COLORS.gray
                            }
                            else{
                                rowStyle.backgroundColor = COLORS.gray2
                            }

                            return (
                                <View key={dia.diaId}>
                                    <DataTable.Row style={rowStyle}>
                                        <DataTable.Cell style={styles.rowGrande}>{dia.data}</DataTable.Cell>
                                        <DataTable.Cell style={styles.rowPequena}>{dia.quilometragem}</DataTable.Cell>
                                        <DataTable.Cell style={styles.rowPequena}>R$ {valorEntrada-valorSaida}</DataTable.Cell>
                                        <DataTable.Cell numeric style={styles.rowMedia}>
                                            <IconButton
                                                icon={icons.edit}
                                                iconColor={COLORS.primary}
                                                onPress={ () => {irAttDia(dia)}}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </DataTable>
        </View>
    )
};

const irAddDia = () => {
    router.replace({ pathname: "/diaCreateScreen", params: {} })
}
const irAttDia = (dia) => {
    router.replace({ pathname: "/diaCreateScreen", params: {"diaId": dia.diaId, "data": dia.data, "km": dia.quilometragem} })
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingBottom: 20,
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: COLORS.secondary,
    },
    sombra: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    rowPequena: {
        maxWidth:"20%",
    },
    rowMedia: {
        maxWidth:"25%",
        alignSelf:"center",
    },
    rowGrande: {
        maxWidth:"40%",
    },

});

export default TabelaDias