import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDB } from '../db';

class Gasolina {
    gasolinaId: Number;
    date: String
    kmAtual: Number;
    kmFinal!: Number;
    litros: Number;
    precoTotal: Number;
};

export async function createGasolina(
        date: String, 
        kmAtual: Number, 
        kmFinal: Number, 
        litros: Number, 
        precoTotal: Number): Promise<Gasolina>{

    var dbData = JSON.parse(await getDB())

    const gasolina = new Gasolina();
    gasolina.gasolinaId = dbData.gasolinaId;
    gasolina.date = date;
    gasolina.kmAtual = kmAtual;
    gasolina.kmFinal = kmFinal;
    gasolina.litros = litros;
    gasolina.precoTotal = precoTotal;
    dbData.gasolinaValorId += 1;

    dbData.gasolinas.push(gasolina)
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))

    return (gasolina);
};

export async function getAllGasolinas(): Promise<Array<Gasolina>>{
    var dbData = JSON.parse(await getDB())
    return dbData.gasolinas;
};

export async function getAllGasolinasByDiaId(id: Number): Promise<Array<Gasolina>>{
    var gasolinas = await getAllGasolinas();
    return gasolinas.filter(gasolina => gasolina.gasolinaId == id);
};

export async function deleteGasolinaById(id: Number){
    var dbData = JSON.parse(await getDB())
    const index = dbData.gasolinas.findIndex((gasolina) => gasolina.gasolinaId == id);
    if (index !== -1){
        dbData.gasolinas.splice(index, 1);
    }
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))
};

export async function updateGasolinaById(
        id: Number,
        date: String, 
        kmAtual: Number, 
        kmFinal: Number, 
        litros: Number, 
        precoTotal: Number, 
    ){
    var dbData = JSON.parse(await getDB())

    dbData.gasolinas.map((gasolina: Gasolina) => {
        if (gasolina.gasolinaId == id){
            gasolina.date = date;
            gasolina.kmAtual = kmAtual;
            gasolina.kmFinal = kmFinal;
            gasolina.litros = litros;
            gasolina.precoTotal = precoTotal;
            return gasolina;
        }
        else{
            return gasolina;
        }
    })
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))
};