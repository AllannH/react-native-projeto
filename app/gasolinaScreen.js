import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SIZES, COLORS, HEADER2 } from "../constants";
import { Gasolina } from "../components";


const GasolinaScreen = () => {

    return(
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={HEADER2} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.menu}>
                    <View>
                        <Gasolina/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    menu: {
        flex: 1,
        gap: SIZES.medium,
        padding: SIZES.medium,
        margin: SIZES.medium,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.tertiary,
    },
})

export default GasolinaScreen;