import "expo-router/entry";
import { createDB } from "./db/db";
import { pt, registerTranslation } from 'react-native-paper-dates'
registerTranslation('pt', pt)
createDB();