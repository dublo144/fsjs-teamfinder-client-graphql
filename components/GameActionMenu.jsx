import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { Colors, FAB, Portal, Provider } from "react-native-paper";
import { useGameDispatch, useGameState } from "../contexts/GameContext";
import { queries } from "../helpers/queries";

const GameActionMenu = (props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const { playerPosition } = useGameState();
  const dispatch = useGameDispatch();

  const [Nearby] = useLazyQuery(queries.NEARBY_PLAYERS, {
    fetchPolicy: "network-only",
    onCompleted: (res) => {
      dispatch({
        type: "GET_NEARBY_PLAYERS",
        payload: {
          nearbyPlayers: res.nearbyPlayers,
        },
      });
    },
    onError: (error) => {
      dispatch({ type: "ERROR", payload: { error } });
    },
  });

  const [GameAreas] = useLazyQuery(queries.NEARBY_GAME_AREAS, {
    fetchPolicy: "network-only",
    onCompleted: (res) => {
      dispatch({
        type: "GET_NEARBY_GAME_AREAS",
        payload: {
          nearbyGameAreas: res.getGameAreasWithinRadius,
        },
      });
    },
    onError: (error) => {
      dispatch({ type: "ERROR", payload: { error } });
    },
  });

  const clearMap = () => {
    dispatch({
      type: "CLEAR_MAP",
    });
  };

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "close" : "gamepad-variant"}
          color={Colors.white}
          style={{
            paddingBottom: 20,
            paddingRight: 10,
          }}
          fabStyle={{
            backgroundColor: Colors.blue700,
          }}
          actions={[
            {
              icon: "account-search",
              label: "Find nearby players",
              onPress: () =>
                Nearby({
                  variables: {
                    input: {
                      longitude: playerPosition.longitude,
                      latitude: playerPosition.latitude,
                      radius: 100,
                    },
                  },
                }),
            },
            {
              icon: "map-marker-radius",
              label: "Find nearby game areas",
              onPress: () =>
                GameAreas({
                  variables: {
                    input: {
                      longitude: playerPosition.longitude,
                      latitude: playerPosition.latitude,
                      radius: 1000,
                    },
                  },
                }),
            },
            {
              icon: "delete",
              label: "Clear map",
              onPress: () => clearMap(),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default GameActionMenu;
