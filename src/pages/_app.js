import { SessionProvider } from "next-auth/react";
import "../styles/style.scss";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => {
        if (router.route === "/auth") return;
        async function sessionExists() {
            const session = await getSession();
            // console.log({ ...session });
            console.log({ ...router });
            if (!session) router.push("/auth");
        }
        sessionExists();
    }, [router]);

    // const { status } = useSession();
    // if (status !== "authenticated") router.push("/login");
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
