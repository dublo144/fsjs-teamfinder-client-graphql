import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { IconButton, Colors, Portal, Provider } from "react-native-paper";
import GameActionMenu from "../components/GameActionMenu";
import MapScreen from "./MapScreen";

const GameScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapScreen />
        <IconButton
          style={styles.topActionContainer}
          icon="menu"
          color={Colors.blue700}
          size={36}
          onPress={() => navigation.openDrawer()}
        />
        <GameActionMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topActionContainer: {
    position: "absolute", //use absolute position to show button on top of the map
    zIndex: 1,
  },
  mapContainer: {
    flex: 1,
  },
});

export default GameScreen;
