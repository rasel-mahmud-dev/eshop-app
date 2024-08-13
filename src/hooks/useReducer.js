import React from "react";

function useReducer(initialState) {
  const reducer = (state, action) => {
    if (typeof action === "function") {
      return {
        ...state,
        ...action(state),
      };
    }
    return {
      ...state,
      ...action,
    };
  };

  return React.useReducer(reducer, initialState);
}

export default useReducer;
