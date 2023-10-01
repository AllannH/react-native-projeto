import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import { COLORS , SIZES } from "../../constants";
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

import { getAllDias } from "../../db/crud/dia";
import { getAllEntradas } from "../../db/crud/entrada";
import { getAllSaidas } from "../../db/crud/saida";

const MediasMensais = () => {
    const [dias, setDias] = useState([]);
    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);
    const [meses, setMeses] = useState({});

    const getAllData = async () =>{
        setDias(await getAllDias());
        setEntradas(await getAllEntradas());
        setSaidas(await getAllSaidas());
        setMeses({});
    }

    useEffect(() => {
        getAllData();
    },[])

    const getMesesData = () => {
        dias.map((dia) => {
            const trecho = dia.data.slice(3)
            var entradasById = entradas.filter(entrada => entrada.diaId == dia.diaId);
            var valorEntrada = entradasById.reduce(function (soma, entrada) {return soma + Number(entrada.valor)}, 0)
            var saidasById = saidas.filter(saida => saida.diaId == dia.diaId);
            var valorSaida = saidasById.reduce(function (soma, saida) {return soma + Number(saida.valor)}, 0)

            if(!meses[trecho]){
                var obj = {
                    "data": trecho,
                    "km": Number(dia.quilometragem),
                    "entrada": valorEntrada,
                    "saida": valorSaida
                };
                meses[trecho] = obj;
                setMeses[meses];
            }
            else{
                meses[trecho].km += Number(dia.quilometragem);
                meses[trecho].entrada += valorEntrada;
                meses[trecho].saida += valorSaida;
            }
        })
        return Object.keys(meses)
    }

    return (
        <View style={[styles.container, styles.sombra]}>
            
            <Collapse>
                <CollapseHeader>
                    <View style={{padding:10, borderRadius: 20, backgroundColor: COLORS.gray2, margin:10, width:"75%", alignSelf:"center"}}>
                        <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: SIZES.large}}>Resultado Por Mês</Text>
                    </View>
                </CollapseHeader>
                <CollapseBody>
                    {
                        getMesesData().map((mes)=>{
                            const dif = meses[mes].entrada - meses[mes].saida
                            return(
                                <View key={mes} style={{padding:10, borderRadius: 20, backgroundColor: COLORS.gray2, margin:10, width:"95%", alignSelf:"center"}}>
                                    <Collapse>
                                        <CollapseHeader>
                                            <View>
                                                <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: SIZES.medium}}>{mes}</Text>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <DataTable style={{paddingTop:10}}>
                                                <DataTable.Header style={{
                                                        backgroundColor: COLORS.secondary,
                                                        borderTopLeftRadius:10,
                                                        borderTopRightRadius:10,
                                                    }}>
                                                    <DataTable.Title style={{maxWidth:"25%"}}>KM Total</DataTable.Title>
                                                    <DataTable.Title style={{maxWidth:"25%"}}>Ganhos</DataTable.Title>
                                                    <DataTable.Title style={{maxWidth:"25%"}}>Gastos</DataTable.Title>
                                                    <DataTable.Title numeric style={{maxWidth:"25%"}}>Total</DataTable.Title>
                                                </DataTable.Header>
                                                <DataTable.Row style={{
                                                        backgroundColor: COLORS.gray,
                                                        borderBottomLeftRadius:10,
                                                        borderBottomRightRadius:10,
                                                    }}>
                                                    <DataTable.Cell style={{maxWidth:"25%"}}>{meses[mes].km}</DataTable.Cell>
                                                    <DataTable.Cell style={{maxWidth:"25%"}}>R${meses[mes].entrada}</DataTable.Cell>
                                                    <DataTable.Cell style={{maxWidth:"25%"}}>R${meses[mes].saida}</DataTable.Cell>
                                                    <DataTable.Cell numeric style={{maxWidth:"25%"}}>R${dif}</DataTable.Cell>
                                                </DataTable.Row>
                                            </DataTable>
                                        </CollapseBody>
                                    </Collapse>
                                </View>
                            );
                        })
                    }
                </CollapseBody>
            </Collapse>
        </View>
    )
};

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
});

export default MediasMensais