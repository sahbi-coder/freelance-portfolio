import { useContext, createContext, useReducer } from "react";

const AppContext = createContext();

import React from "react";

const ACTIONS = {
  EN: "EN",
  FR: "FR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.EN:
      return { language: "EN" };
    case ACTIONS.FR:
      return { language: "FR" };

    default:
      return { language: "FR" };
  }
};
const initialState = {
  language: "EN",
};

function AppRapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch,ACTIONS }}>
      {children}
    </AppContext.Provider>
  );
}


export const useAppContext =  ()=>{
    return useContext(AppContext)
}
export default AppRapper;
