import Layout from "../components/Layout";
import "../styles/globals.css";
import { createContext, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

export const AppContext = createContext();

export default function App({ Component, pageProps }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartQuantity, setCartQuantity] = useState([]);

  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const productInfo = { cartQuantity, setCartQuantity, isAdmin, setIsAdmin };

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppContext.Provider value={productInfo}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
