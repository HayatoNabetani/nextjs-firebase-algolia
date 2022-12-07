import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/auth";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    );
}

export default MyApp;
