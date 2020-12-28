import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Divider, Drawer } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import UserInformation from "./UserInformation";
import { useAuthDispatch, useAuthState } from "../contexts/AuthContext";

const DrawerContent = (props) => {
  const authState = useAuthState();
  const dispatch = useAuthDispatch();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* Top */}
          <UserInformation user={authState} />

          {/* Mid */}
          <Drawer.Section style={styles.drawerSection}>
            <Divider />
            <DrawerItem
              label="Game Map"
              icon={({ color, size }) => (
                <Ionicons name="map-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              label="Stats"
              icon={({ color, size }) => (
                <Ionicons
                  name="stats-chart-outline"
                  color={color}
                  size={size}
                />
              )}
              onPress={() => {}}
            />
            <DrawerItem
              label="Profile"
              icon={({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              )}
              onPress={() => {}}
            />
            <DrawerItem
              label="Settings"
              icon={({ color, size }) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      {/* Bottom */}
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sign out"
          icon={({ color, size }) => (
            <Ionicons name="exit-outline" color={color} size={size} />
          )}
          onPress={() => {
            dispatch({
              type: "SIGN_OUT",
            });
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfo: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
