import Layout from "../components/Layout";
import "../styles/globals.css";
import { createContext, useState } from "react";

export const AppContext = createContext()

export default function App({ Component, pageProps }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartQuantity, setCartQuantity] = useState([])

const productInfo = {cartQuantity, setCartQuantity, isAdmin, setIsAdmin }

  return (
    <AppContext.Provider value={productInfo}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AppContext.Provider>
  );
}
