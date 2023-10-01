import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDB } from '../db';

class SaidaValor {
    saidaId: Number;
    valor: Number;
    descricao!: String;
    diaId: Number;
};

export async function createSaidaValor(valor: Number, descricao: String, diaId: Number): Promise<SaidaValor>{
    var dbData = JSON.parse(await getDB())

    const saida = new SaidaValor();
    saida.saidaId = dbData.saidaValorId;
    saida.valor = valor;
    saida.descricao = descricao;
    saida.diaId = diaId;
    dbData.saidaValorId += 1;

    dbData.saidaValores.push(saida)
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))

    return (saida);
};

export async function getAllSaidas(): Promise<Array<SaidaValor>>{
    var dbData = JSON.parse(await getDB())
    return dbData.saidaValores;
};

export async function getAllSaidasByDiaId(diaId: Number): Promise<Array<SaidaValor>>{
    var entradas = await getAllSaidas();
    return entradas.filter(entrada => entrada.diaId == diaId);
};

export async function deleteSaidaById(id: Number){
    var dbData = JSON.parse(await getDB())
    const index = dbData.saidaValores.findIndex((saida) => saida.saidaId == id);
    if (index !== -1){
        dbData.saidaValores.splice(index, 1);
    }
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))
};