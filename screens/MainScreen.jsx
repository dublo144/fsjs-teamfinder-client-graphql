import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import GameScreen from "./GameScreen";
import Settings from "./Settings";
import DrawerContent from "./DrawerContent";
import RootStackScreen from "./RootStackScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { useAuthState } from "../contexts/AuthContext";
import { GameProvider } from "../contexts/GameContext";

const Drawer = createDrawerNavigator();

const MainScreen = () => {
  const { isLoggedIn } = useAuthState();

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator
  //         animating={true}
  //         color={Colors.blue400}
  //         size={"large"}
  //       />
  //     </View>
  //   );
  // }

  return (
    <GameProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="Home" component={GameScreen} />
            <Drawer.Screen name="Settings" component={Settings} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </GameProvider>
  );
};

export default MainScreen;
