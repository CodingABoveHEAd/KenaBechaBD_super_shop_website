import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";


// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [seller, setSeller] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItem] = useState([]);

  //Add products toc
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId]+= 1;
      
    } else {
      cartData[itemId] = 1;
      console.log('else');
    }console.log(cartData.itemId);
    setCartItem(cartData);
    toast.success("Item added to cart");
  };

  //update products in cart
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += quantity;
      setCartItem(cartData);
      toast.success("Item updated in cart");
    }
  };

  //remove products from cart
  const removeCartItem = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      cartData[itemId] === 0 && delete cartData[itemId];
      toast.success("Item removed from cart");
      setCartItem(cartData);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(dummyProducts);
    };
    fetchProducts();
  }, []);

  const payload = {
    navigate,
    user,
    setUser,
    seller,
    setSeller,
    loggedin,
    setLoggedin,
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeCartItem,
  };
  return <AppContext.Provider value={payload}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
