import State from "./State";

export const reducer = (state = State, action) => {
    switch (action.type) {
      case "STORE_TOKEN":
        return {
          ...state,
          authToken: action.payload
        };
      default:
        return state;
    }
};