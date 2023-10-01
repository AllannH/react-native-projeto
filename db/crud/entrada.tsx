import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDB } from '../db';

class EntradaValor {
    entradaId: Number;
    valor: Number;
    descricao!: String;
    diaId: Number;
};

export async function createEntradaValor(valor: Number, descricao: String, diaId: Number): Promise<EntradaValor>{
    var dbData = JSON.parse(await getDB())

    const entrada = new EntradaValor();
    entrada.entradaId = dbData.entradaValorId;
    entrada.valor = valor;
    entrada.descricao = descricao;
    entrada.diaId = diaId;
    dbData.entradaValorId += 1;

    dbData.entradaValores.push(entrada)
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))

    return (entrada);
};

export async function getAllEntradas(): Promise<Array<EntradaValor>>{
    var dbData = JSON.parse(await getDB())
    return dbData.entradaValores;
};

export async function getAllEntradasByDiaId(diaId: Number): Promise<Array<EntradaValor>>{
    var entradas = await getAllEntradas();
    return entradas.filter(entrada => entrada.diaId == diaId);
};

export async function deleteEntradaById(id: Number){
    var dbData = JSON.parse(await getDB())
    const index = dbData.entradaValores.findIndex((entrada) => entrada.entradaId == id);
    if (index !== -1){
        dbData.entradaValores.splice(index, 1);
    }
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))
};