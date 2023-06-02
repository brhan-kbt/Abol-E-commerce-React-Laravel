import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  selectedProduct: null,
  cartItems: [],
  setCurrentUser: () => {},
  setUserToken: () => {},
  setSelectedProduct: () => {},
  addToCart: () => {},
});




export const ContextProvider = ({ children }) => {

  const [currentUser, _setCurrentUser] = useState(JSON.parse(localStorage.getItem('abol_user')) || {});
  const [userToken, _setUserToken] = useState(localStorage.getItem('abol_token') || '');
  const [selectedProduct, _setSelectedProduct] = useState({});
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

   const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('abol_token', token)
    } else {
      localStorage.removeItem('abol_token')
    }
    _setUserToken(token);
   }

   const setSelectedProduct=(prod)=>{
    _setSelectedProduct(prod);
    console.log('Context:',selectedProduct)
   }

   useEffect(() => {
    console.log('Context:', selectedProduct);
  }, [selectedProduct]);
 

   const setCurrentUser = (token) => {
    if (token) {
      localStorage.setItem('abol_user', JSON.stringify(token));
    } else {
      localStorage.removeItem('abol_user')
    }
    _setCurrentUser(token);
   }

   const addToCart = (product) => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      // If the product already exists in the cart, increase its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // If the product does not exist in the cart, add it with quantity 1
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCart);
    }
  };
  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  
  return (
    <StateContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          userToken,
          setUserToken,
          selectedProduct,
          setSelectedProduct,
          setCartItems,
          cartItems,
          addToCart,
        }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
