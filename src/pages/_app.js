import { SessionProvider } from "next-auth/react";
import "../styles/style.scss";

export default function App({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
