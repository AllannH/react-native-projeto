import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { Button, DataTable, IconButton } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import { router } from "expo-router";

import { COLORS , icons, SIZES } from "../../constants";
import { getAllGasolinas } from "../../db/crud/gasolina";


const Gasolina = () => {
    const [gasolinas, setGasolinas] = useState([]);

    const getGasolinas = async () =>{
        setGasolinas(await getAllGasolinas())
    }

    useEffect(() => {
        getGasolinas()
    },[])

    return (
        <View style={[styles.container, styles.sombra]}>
            <View style={{flex:1, flexDirection:"row", justifyContent: "space-between"}}>
                <View>
                    <Text style={{width:"75%", alignSelf:"center", fontWeight:"bold", fontSize: SIZES.large}}> Resumo Combustível</Text>
                </View>
                <View>
                    <Button icon="plus-circle" mode="text" textColor={COLORS.primary} style={{ paddingVertical:10}} onPress={() => irAddGasolina()}>NOVO</Button>
                </View>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ maxWidth:"27%" }}>Data</DataTable.Title>
                    <DataTable.Title style={{ maxWidth:"33%" }}>KM Rodado</DataTable.Title>
                    <DataTable.Title style={{ maxWidth:"20%" }}>Km por L</DataTable.Title>
                    <DataTable.Title numeric style={{ maxWidth:"15%" }}></DataTable.Title>
                </DataTable.Header>
                <ScrollView style={{height:240}}>
                    {
                        gasolinas.map((gasolina, index) =>{
                            var dif = gasolina.kmFinal - gasolina.kmAtual
                            dif = (dif && dif >= 0)?dif:"Aguardando"
                            var media = (dif/gasolina.litros).toFixed(2)
                            media = (media && media >= 0)?media:""

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
                                <View key={index}>
                                    <DataTable.Row style={rowStyle}>
                                        <DataTable.Cell style={{ maxWidth:"35%" }}>{gasolina.date}</DataTable.Cell>
                                        <DataTable.Cell style={{ maxWidth:"30%" }}>{dif}</DataTable.Cell>
                                        <DataTable.Cell style={{ maxWidth:"15%" }}>{media}</DataTable.Cell>
                                        <DataTable.Cell numeric style={{ maxWidth:"25%" }}>
                                            <IconButton
                                                icon={icons.edit}
                                                iconColor={COLORS.primary}
                                                onPress={ () => {irAttGasolina(gasolina)}}
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

const irAddGasolina = () => {
    router.replace({ pathname: "/gasolinaCreateScreen", params: {} })
}

const irAttGasolina = (gasolina) => {
    const inicio = (gasolina.kmAtual)? gasolina.kmAtual: "";
    const final = (gasolina.kmFinal)? gasolina.kmFinal: "";

    router.replace({ pathname: "/gasolinaCreateScreen", params: {
        "gasolinaId": gasolina.gasolinaId, 
        "date": gasolina.date, 
        "kmAtual": inicio, 
        "kmFinal": final,
        "litros": gasolina.litros,
        "precoTotal": gasolina.precoTotal
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
        maxWidth:"15%",
    },
});

export default Gasolina