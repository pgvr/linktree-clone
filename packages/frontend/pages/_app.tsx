import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { useApollo } from "../lib/apolloClient";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps}></Component>
    </ApolloProvider>
  );
}
