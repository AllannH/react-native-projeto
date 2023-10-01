import { IconButton } from 'react-native-paper';
import { router } from "expo-router";
import home from '../assets/icons/home.png'

const COLORS = {
  primary: "#223843",
  secondary: "#DBD3D8",
  tertiary: "#EFF1F3",

  gray: "#B6B6B6",
  gray2: "#E2E2E2",
};

const SIZES = {
  xxSmall: 5,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const HEADER1 = {
  headerStyle: { backgroundColor: COLORS.primary},
  headerLeft: () => (
      <IconButton 
          icon="cog"
          iconColor={COLORS.tertiary}
          onPress={()=> irSettings()}
      />
  ),
  headerRight: () => (
      <IconButton 
          icon={home}
          iconColor={COLORS.tertiary}
          onPress={()=> irHome()}
      />
  ),
  title:"Anotações",
  headerTitleAlign:"center",
  headerTintColor: COLORS.tertiary,
};

const irHome = () => {
  router.replace('/')
}
const irSettings = () => {
  router.replace('/settings')
}
const HEADER2 = {
  headerStyle: { backgroundColor: COLORS.primary},
  headerRight: () => (
      <IconButton 
          icon={home}
          iconColor={COLORS.tertiary}
          onPress={()=> irHome()}
      />
  ),
  title:"Anotações",
  headerTitleAlign:"center",
  headerTintColor: COLORS.tertiary,

};

export { COLORS, SIZES, HEADER1, HEADER2 };
