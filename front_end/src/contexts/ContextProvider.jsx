import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
});




export const ContextProvider = ({ children }) => {

  const [currentUser, _setCurrentUser] = useState(JSON.parse(localStorage.getItem('abol_user')) || {});
  const [userToken, _setUserToken] = useState(localStorage.getItem('abol_token') || '');

   const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('abol_token', token)
    } else {
      localStorage.removeItem('abol_token')
    }
    _setUserToken(token);
   }

   const setCurrentUser = (token) => {
    if (token) {
      localStorage.setItem('abol_user', JSON.stringify(token));
    } else {
      localStorage.removeItem('abol_user')
    }
    _setCurrentUser(token);
   }

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
