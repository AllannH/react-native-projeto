import { ScrollView, SafeAreaView } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { IconButton } from 'react-native-paper';
import { COLORS, icons } from "../constants";
import { CriarNovaGasolina } from "../components";


const AdicionarGasolina = () => {
    const params = useLocalSearchParams();
    
    return(
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.secondary
        }}>
            <Stack.Screen options={HEADER} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <CriarNovaGasolina data={params}/>
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
            onPress={()=> irGasolisaScreen()}
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

const irGasolisaScreen = () => {
    router.replace('/gasolinaScreen')
}
const irHome = () => {
  router.replace('/')
}

export default AdicionarGasolina;