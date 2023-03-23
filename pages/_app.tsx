import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout/layout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistStoree } from "../Redux/store";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-100/40 dark:bg-gray-900">
      <Provider store={store}>
        <PersistGate persistor={persistStoree}>
          <ThemeProvider enableSystem={true} attribute="class">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
