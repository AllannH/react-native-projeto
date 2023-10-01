import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDB } from '../db';

class Dia {
    diaId: Number;
    data: String;
    quilometragem!: Number;
};

export async function createDia(data: String, quilometragem: Number): Promise<Dia>{
    var dbData = JSON.parse(await getDB())

    const dia = new Dia();
    dia.diaId = dbData.diaId;
    dia.data = data;
    dia.quilometragem = quilometragem;
    dbData.diaId += 1;
    dbData.dias.push(dia)
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))

    return (dia);
};

export async function getAllDias(): Promise<Array<Dia>>{
    var dbData = JSON.parse(await getDB())
    return dbData.dias.sort(function(a,b) {
        let [day, month, year] = (a.data).split('/')
        const date1 = new Date(+year, +month - 1, +day).getTime();

        let [day2, month2, year2] = String(b.data).split('/')
        const date2 = new Date(+year2, +month2 - 1, +day2).getTime();
        return ((date1 > date2) ? -1 : ((date1 < date2) ? 1 : 0));
    })
};

export async function getDiaById(id: Number): Promise<Array<Dia>>{
    var dias = await getAllDias();
    return dias.filter(dia => dia.diaId == id);
};

export async function updateDiaById(id: Number, data: String, quilometragem: Number){
    var dbData = JSON.parse(await getDB())

    dbData.dias.map((dia) => {
        if (dia.diaId == id){
            dia.data = data;
            dia.quilometragem = quilometragem;
            return dia;
        }
        else{
            return dia;
        }
    })
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))
};

export async function deleteDiaById(id: Number){
    var dbData = JSON.parse(await getDB())
    const index = dbData.dias.findIndex((dia) => dia.diaId == id);
    if (index !== -1){
        dbData.dias.splice(index, 1);
    }
    await AsyncStorage.setItem('dbData', JSON.stringify(dbData))
};