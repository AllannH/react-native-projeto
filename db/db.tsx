import dataMock from './banco.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function createDB(){
    const data = await AsyncStorage.getItem('dbData')
    if( data==="null"){
        console.log("RESETEI O BANCO")
        await AsyncStorage.setItem('dbData', JSON.stringify(dataMock))
    }
};

export async function setDB(data) {
    if(!data){
        data = JSON.stringify(dataMock)
    }
    await AsyncStorage.setItem('dbData', data)
};

export async function getDB() {
    const data = await AsyncStorage.getItem('dbData')
    return data
};
