import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout/layout";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-100/40 dark:bg-gray-900">
      <ThemeProvider enableSystem={true} attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
