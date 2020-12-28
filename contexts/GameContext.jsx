import React from "react";

const GameStateContext = React.createContext();
const GameDispatchContext = React.createContext();

const initialState = {
  playerPosition: null,
  nearbyGameAreas: [],
  nearbyPlayers: [],
  nearbyPosts: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAYER_POSITION": {
      return setPlayerPosition(state, action);
    }
    case "GET_NEARBY_GAME_AREAS": {
      return getNearbyGameAreas(state, action);
    }
    case "GET_NEARBY_PLAYERS": {
      return getNearbyPlayers(state, action);
    }
    case "CLEAR_MAP": {
      return clearMap(state);
    }
    case "ERROR": {
      return handleError(state, action);
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const setPlayerPosition = (state, action) => {
  return {
    ...state,
    playerPosition: {
      longitude: action.payload.longitude,
      latitude: action.payload.latitude,
    },
  };
};

const getNearbyGameAreas = (state, action) => {
  return {
    ...state,
    nearbyGameAreas: action.payload.nearbyGameAreas,
  };
};

const getNearbyPlayers = (state, action) => {
  return {
    ...state,
    nearbyPlayers: action.payload.nearbyPlayers,
  };
};

const clearMap = (state) => {
  return {
    ...state,
    nearbyPlayers: [],
    nearbyGameAreas: [],
    nearbyPosts: [],
  };
};

const handleError = (state, action) => {
  console.log(action.payload.error.message);
  return {
    ...state,
    error: action.payload.error.message,
  };
};

const GameProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

const useGameState = () => {
  const context = React.useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameProvider");
  }
  return context;
};

const useGameDispatch = () => {
  const context = React.useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error("useGameDispatch must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGameState, useGameDispatch };
