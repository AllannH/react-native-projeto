import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { Button, DataTable, IconButton } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import { router } from "expo-router";

import { COLORS , icons, SIZES } from "../../constants";
import { getAllMeses } from "../../db/crud/mes";


const KmMes = () => {
    const [meses, setMeses] = useState([]);

    const getMeses = async () =>{
        setMeses(await getAllMeses())
    }

    useEffect(() => {
        getMeses()
    },[])

    return (
        <View style={[styles.container, styles.sombra]}>
            <View style={{flex:1, flexDirection:"row", justifyContent: "space-between"}}>
                <View>
                    <Text style={{width:"75%", alignSelf:"center", fontWeight:"bold", fontSize: SIZES.large}}>Resumo KM Por Mês</Text>
                </View>
                <View>
                    <Button icon="plus-circle" mode="text" textColor={COLORS.primary} style={{ paddingVertical:10 }} onPress={() => irAddMes()}>NOVO</Button>
                </View>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.rowPequena}>Data</DataTable.Title>
                    <DataTable.Title style={styles.rowMedia}>KM Total</DataTable.Title>
                    <DataTable.Title numeric style={styles.rowGrande}></DataTable.Title>
                </DataTable.Header>
                <ScrollView style={{height:240}}>
                    {
                        meses.map((mes, index) =>{
                            var dif = mes.quilometragemFinal - mes.quilometragemInicial
                            dif = (dif && dif >= 0)?dif:"Aguardando"

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
                                <View key={mes.mesId}>
                                    <DataTable.Row style={rowStyle}>
                                        <DataTable.Cell style={styles.rowPequena}>{mes.data}</DataTable.Cell>
                                        <DataTable.Cell style={styles.rowMedia}>{dif}</DataTable.Cell>
                                        <DataTable.Cell numeric style={styles.rowGrande}>
                                            <IconButton
                                                icon={icons.edit}
                                                iconColor={COLORS.primary}
                                                onPress={ () => {irAttMes(mes)}}
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

const irAddMes = () => {
    router.replace({ pathname: "/mesCreateScreen", params: {} })
}
const irAttMes = (mes) => {
    const inicio = (mes.quilometragemInicial)? mes.quilometragemInicial: "";
    const final = (mes.quilometragemFinal)? mes.quilometragemFinal: "";
    router.replace({ pathname: "/mesCreateScreen", params: {
        "mesId": mes.mesId, 
        "dataMes": mes.data, 
        "quilometragemInicial": inicio, 
        "quilometragemFinal": final
    }})
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
        maxWidth:"50%",
    },
    rowMedia: {
        maxWidth:"45%",
    },
    rowGrande: {
        maxWidth:"25%",
    },
});

export default KmMes