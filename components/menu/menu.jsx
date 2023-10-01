import { StyleSheet, Text, View } from 'react-native'
import { IconButton, TouchableRipple } from 'react-native-paper'
import { router } from "expo-router";

import { COLORS , SIZES } from "../../constants";

const irAllScreen = () => {
    router.replace('/allScreen')
}
const irDiaScreen = () => {
    router.replace('/diaScreen')
}
const irMesScreen = () => {
    router.replace('/resultadoMesScreen')
}
const irGasolinaScreen = () => {
    router.replace('/gasolinaScreen')
}
const irKmScreen = () => {
    router.replace('/mesScreen')
}


const MenuCompleto = () => {
    return (
        <View style={[styles.container, styles.sombra]}>
            <TouchableRipple onPress={() => irAllScreen()} rippleColor="rgba(0, 0, 0, .32)">
                <View style={[styles.bloco, styles.sombra]}>
                    <IconButton
                        mode="outlined"
                        icon="expand-all"
                        size={36}
                        iconColor={COLORS.primary}
                    />
                    <Text style={styles.titulo}>Ver Tudo</Text>
                </View>
            </TouchableRipple>

            <View style={{flex: 1, flexDirection:"row", gap: 20}}>
                <View style={{flex: 0.5}}>
                    <TouchableRipple onPress={() => irMesScreen()} rippleColor="rgba(0, 0, 0, .32)">
                        <View style={[styles.bloco, styles.sombra, styles.card]}>
                            <IconButton
                                mode="outlined"
                                icon="calendar-month"
                                size={36}
                                iconColor={COLORS.primary}
                            />
                            <Text style={styles.titulo}>Mensal</Text>
                        </View>
                    </TouchableRipple>
                </View>
                
                <View style={{flex: 0.5}}>
                    <TouchableRipple onPress={() => irDiaScreen()} rippleColor="rgba(0, 0, 0, .32)">
                        <View style={[styles.bloco, styles.sombra, styles.card]}>
                            <IconButton
                                mode="outlined"
                                icon="calendar-today"
                                size={36}
                                iconColor={COLORS.primary}
                            />
                            <Text style={styles.titulo}>Diário</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>

            <View style={{flex: 1, flexDirection:"row", gap: 20}}>
                <View style={{flex: 0.5}}>
                    <TouchableRipple onPress={() => irGasolinaScreen()} rippleColor="rgba(0, 0, 0, .32)">
                        <View style={[styles.bloco, styles.sombra, styles.card]}>
                            <IconButton
                                mode="outlined"
                                icon="fuel"
                                size={36}
                                iconColor={COLORS.primary}
                            />
                            <Text style={styles.titulo} >Gasolina</Text>
                        </View>
                    </TouchableRipple>
                </View>

                <View style={{flex: 0.5}}>
                    <TouchableRipple onPress={() => irKmScreen()} rippleColor="rgba(0, 0, 0, .32)">
                        <View style={[styles.bloco, styles.sombra, styles.card]}>
                            <IconButton
                                mode="outlined"
                                icon="map-marker-distance"
                                size={36}
                                iconColor={COLORS.primary}
                            />
                            <Text style={styles.titulo}>KM Total</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        gap: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.secondary,
    },
    sombra: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    bloco: {
        backgroundColor: COLORS.tertiary, 
        alignItems: "center",
        borderRadius: 15,
    },
    card: {
        padding: 10,
        alignItems: "center", 
        borderRadius: 15,
    },
    titulo: {
        textAlign: "center",
        fontSize: SIZES.xLarge, 
        color: COLORS.primary, 
        fontWeight: "700"
    }
});

export default MenuCompleto