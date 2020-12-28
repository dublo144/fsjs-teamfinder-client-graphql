import React from "react";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useGameDispatch, useGameState } from "../contexts/GameContext";
import { ActivityIndicator, Colors } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

const MapScreen = () => {
  const { playerPosition, nearbyGameAreas, nearbyPlayers } = useGameState();
  const dispatch = useGameDispatch();

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission Denied");
      }
      const currentPostion = await Location.getCurrentPositionAsync();
      dispatch({
        type: "SET_PLAYER_POSITION",
        payload: {
          longitude: currentPostion.coords.longitude,
          latitude: currentPostion.coords.latitude,
        },
      });
    })();
  }, []);

  if (!playerPosition) {
    return <ActivityIndicator style={styles.loading} size={"large"} />;
  }

  return (
    <MapView
      showsUserLocation
      loadingEnabled={true}
      style={styles.mapStyle}
      region={{
        ...playerPosition,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {nearbyGameAreas.map((area) => (
        <MapView.Polygon
          key={area.name}
          coordinates={area.coordinates}
          strokeColor={Colors.white}
          fillColor={"#D94CAF50"}
          strokeWidth={2}
        />
      ))}
      {nearbyPlayers.map((user) => (
        <MapView.Marker
          key={user.userName}
          title={user.userName}
          coordinate={user.position}
        >
          <Ionicons name={"man"} size={24} color={Colors.blue700} />
        </MapView.Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  loading: {
    alignContent: "center",
    justifyContent: "center",
  },
});

export default MapScreen;
