import React from "react";
import { View, Text, Button } from "react-native";
import GameActionMenu from "../components/GameActionMenu";

const Settings = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <GameActionMenu />
    </View>
  );
};

export default Settings;
