import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDB } from '../db';

class QuilometragemMes {
    mesId: Number;
    data: String;
    quilometragemInicial: Number;
    quilometragemFinal!: Number;
};

export async function createQuilometragemMes(data: String, quilometragemInicial: Number, quilometragemFinal: Number): Promise<QuilometragemMes>{
    var dbData = JSON.parse(await getDB())

    const mes = new QuilometragemMes();
    mes.mesId = dbData.quilometragemMesId;
    mes.data = data;
    mes.quilometragemInicial = quilometragemInicial;
    mes.quilometragemFinal = quilometragemFinal;
    dbData.quilometragemMesId += 1;

    dbData.quilometragemMes.push(mes)
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))

    return (mes);
};

export async function getAllMeses(): Promise<Array<QuilometragemMes>>{
    var dbData = JSON.parse(await getDB())
    return dbData.quilometragemMes;
};

export async function deleteMesById(id: Number){
    var dbData = JSON.parse(await getDB())
    const index = dbData.quilometragemMes.findIndex((mes: QuilometragemMes) => mes.mesId == id);
    if (index !== -1){
        dbData.quilometragemMes.splice(index, 1);
    }
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))
};

export async function updateMesById(id: Number, data: String, quilometragemInicial: Number, quilometragemFinal: Number){
    var dbData = JSON.parse(await getDB())

    dbData.quilometragemMes.map((mes: QuilometragemMes) => {
        if (mes.mesId == id){
            mes.data = data;
            mes.quilometragemInicial = quilometragemInicial;
            mes.quilometragemFinal = quilometragemFinal;
            return mes;
        }
        else{
            return mes;
        }
    })
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))
};