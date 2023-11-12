import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link
                    rel='preconnect'
                    href='https://fonts.googleapis.com/css?family=Roboto+Slab:200,300,regular,500,600,700,800,900&display=optional'
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
