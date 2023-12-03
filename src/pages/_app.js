import { SessionProvider } from "next-auth/react";
import "../styles/style.scss";
import { useRouter } from "next/router";
import { useState } from "react";

const loadingJsx = <h1>Loading...</h1>;

export default function App({ Component, pageProps }) {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    console.log({ userIsLoggedIn });
    // console.log("props from app", { ...pageProps });
    console.log(Component.name);
    console.log("isloading from _app: ", { isLoading });
    return (
        <SessionProvider session={pageProps.session}>
            {isLoading ? loadingJsx : <Component {...pageProps} />}
        </SessionProvider>
    );
}

/*
    useEffect(() => {
        async function checkSessionExists() {
            const clientSession = !!(await getSession());
            const serverSession = !!pageProps?.session;
            console.log({ serverSession }, { clientSession });
            setUserIsLoggedIn(clientSession || serverSession);
        }

        function routeCheck() {
            if (userIsLoggedIn && router.route === "/auth") {
                console.log("routing back to /");
                router.push("/");
            } else if (!userIsLoggedIn && router.route !== "/auth") {
                console.log("routing back to /auth");
                router.push("/auth");
            }
            if (isLoading) setIsLoading(false);
        }
        // =============================================
        // route change event handlers
        const handleRouteChangeStart = () => {
            console.log("start handler runs");
            if (!isLoading) setIsLoading(true);
        };
        const handleRouteChangeComplete = () => {
            console.log("complete handler runs");
            routeCheck();
            if (isLoading) setIsLoading(false);
        };
        // =============================================
        checkSessionExists();

        router.events.on("routeChangeStart", handleRouteChangeStart);
        // on route change complete - run auth check
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
        // setIsLoading(false);
    }, [router]);*/
/*
    useEffect(() => {
        function authCheck() {
            console.log(Component.name);
            if (userIsLoggedIn && Component.name === "Auth") {
                router.push("/");
            } else if (!userIsLoggedIn && Component.name !== "Auth") {
                router.push("/auth");
            }
            if (isLoading) setIsLoading(false);
        }

        router.events.on("routeChangeStart", () => {
            if (!isLoading) setIsLoading(true);
        });
        console.log({ isLoading });

        authCheck();

        // on route change complete - run auth check
        router.events.on("routeChangeComplete", () => {
            if (isLoading) setIsLoading(false);
        });

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off("routeChangeStart", () => {
                if (userIsLoggedIn) setUserIsLoggedIn(false);
            });
            router.events.off("routeChangeComplete", authCheck);
        };
        // setIsLoading(false);
    }, []);
*/
