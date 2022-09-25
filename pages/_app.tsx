import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContext from "../src/Store/auth-context";
import React, { useContext } from "react";
import Navigation from "../src/Components/UI/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
  const authContext = useContext(AuthContext);
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
