import { useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView, StyleSheet, Text , Modal} from "react-native";
import { Stack } from "expo-router";
import { SIZES, COLORS, HEADER1 } from "../constants";
import { Button, TextInput, Dialog, Portal, PaperProvider} from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import base64 from 'react-native-base64';
import { getDB, setDB } from "../db/db";


const Index = () => {
    const [backup, setBackup] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [banco, setBanco] =  useState("");

    const [visible, setVisible] = useState(false);
    const showDialog = () => { 
        setVisible(true);
        exportarDB();
    };
    const hideDialog = () => setVisible(false);

    const exportarDB = async () => {
        await Clipboard.setStringAsync(base64.encode(banco));
    };
    
    const importarDB = async () => {
        await setDB( (backup)? base64.decode(backup): backup);
        setModalVisible(!modalVisible);
        setBackup("");
    };

    const getData = async () => {
        var dbData = JSON.parse(await getDB());
        setBanco(JSON.stringify(dbData));
    };

    useEffect( () => {
        getData();
    },[]);

    return(
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={HEADER1} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <PaperProvider>
                    <View style={styles.menu}>
                            <Button textColor={COLORS.primary} style={{backgroundColor: "#4FB477"}} onPress={showDialog}>
                                Clique aqui para copiar o backup!
                            </Button>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor:COLORS.tertiary}}>
                                    <Dialog.Title style={{color: COLORS.primary}}>Copiado!</Dialog.Title>
                                    <Dialog.Content>
                                        <Text variant="bodyMedium" style={{color: COLORS.primary}}>Backup copiado com sucesso! </Text>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button textColor={COLORS.primary} onPress={hideDialog}>Fechar</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>

                        <TextInput
                            mode="outlined"
                            label="Cole o backup aqui!"
                            value={backup}
                            multiline={true}
                            style={{backgroundColor: COLORS.tertiary, marginVertical: 40, height: 200}}
                            onChangeText={backup => setBackup(backup)}
                        />
                        <Button textColor={COLORS.primary} style={{backgroundColor: "#DE4600"}} onPress={ () => setModalVisible(!modalVisible) }>
                            Clique aqui para importar o backup!
                        </Button>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{fontWeight:"bold", fontSize:SIZES.medium}}>Tem certeza que deseja importar?</Text>
                                    <Text style={{fontWeight:"bold", fontSize:SIZES.small}}>(está operação não pode ser desfeita)</Text>
                                    <Text style={{fontWeight:"bold", fontSize:SIZES.small}}>(dados poderão ser perdidos)</Text>
                                    <Text style={{fontWeight:"bold", fontSize:SIZES.small, textAlign:"center"}}>se o campo estiver vazio os dados serão resetados</Text>
                                    
                                    <View style={{flexDirection:"row", width:"110%" , justifyContent:"space-between", marginTop:60}}>
                                        <Button style={styles.botaoCriar}  textColor={COLORS.primary}  onPress={() => setModalVisible(!modalVisible)} uppercase={false} mode="elevated">
                                            Voltar
                                        </Button>
                                        <Button style={styles.botaoDeletar}  textColor={COLORS.primary}  onPress={() => importarDB()} uppercase={false} mode="elevated">
                                            Importar
                                        </Button>

                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>
                </PaperProvider>
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
    botaoCriar: {
        width: "48%", alignSelf:"center", 
        backgroundColor:"#4FB477"
    },
    botaoDeletar: {
        width: "48%", alignSelf:"center", 
        backgroundColor:"#b44f4f"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default Index;