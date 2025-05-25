import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

(axios.defaults.withCredentials = true),
  (axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL);

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [seller, setSeller] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItem] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setSeller(true);
      } else {
        setSeller(false);
      }
    } catch (e) {
      console.log(e);
      setSeller(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data?.success) {
        setUser(data.user);
        setCartItem(data.user.cartItems || {}); // Prevent undefined
      } else {
        toast.error(data.message || "Failed to fetch user");
      }
    } catch (error) {
      setUser(null);

      if (error.response && error.response.data) {
        toast.error(error.response.data.message); // Backend error message
      } else {
        toast.error("Something went wrong while fetching user");
      }

      console.error("FetchUser error:", error.message);
    }
  };

  //Add products toc
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
      // console.log('else');
    }
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

  //cart item count
  const getCartCount = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      const product = products.find((product) => product._id === item);
      total += product.price * cartItems[item];
    }
    return Math.floor(total * 100) / 100;
  };

  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
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
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
  };
  return <AppContext.Provider value={payload}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
