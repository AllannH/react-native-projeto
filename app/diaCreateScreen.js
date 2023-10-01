import { ScrollView, SafeAreaView } from "react-native";
import { IconButton } from 'react-native-paper';
import { Stack, useLocalSearchParams, router } from "expo-router";
import { COLORS, icons } from "../constants";
import { CriarNovoDia } from "../components";


const AdicionarDia = () => {
    const params = useLocalSearchParams();
    
    return(
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.secondary
        }}>
            <Stack.Screen options={HEADER} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <CriarNovoDia data={params}/>
            </ScrollView>
        </SafeAreaView>
     )
}

const HEADER = {
    headerStyle: { backgroundColor: COLORS.primary},
    headerLeft: () => (
        <IconButton 
            icon="arrow-left"
            iconColor={COLORS.tertiary}
            onPress={()=> irDiaScreen()}
        />
    ),
    headerRight: () => (
        <IconButton 
            icon={icons.home}
            iconColor={COLORS.tertiary}
            onPress={()=> irHome()}
        />
    ),
    title:"Anotações",
    headerTitleAlign:"center",
    headerTintColor: COLORS.tertiary,

};

const irDiaScreen = () => {
    router.replace('/diaScreen')
}

const irHome = () => {
  router.replace('/')
}

export default AdicionarDia;