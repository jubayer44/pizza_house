import Layout from "../components/Layout";
import "../styles/globals.css";
import { createContext, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

export const AppContext = createContext();

export default function App({ Component, pageProps }) {
  const [myCart, setMyCart] = useState([]);
  const [count, setCount] = useState(0);

  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const productInfo = { myCart, setMyCart, count, setCount };

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
