import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SIZES, COLORS, HEADER1 } from "../constants";
import { MenuCompleto } from "../components";


const Index = () => {

    return(
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={HEADER1} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.menu}>
                    <MenuCompleto/>
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
        padding: SIZES.medium,
        margin: SIZES.medium,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.tertiary,
        marginVertical: 100
    },
})

export default Index;