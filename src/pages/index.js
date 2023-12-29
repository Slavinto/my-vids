import Head from "next/head";
import Banner from "@/components/Banner.component";
import Navbar from "@/components/Navbar.component";
import Cards from "@/components/Cards.component";
import { signJwtToken } from "../../lib/jwt";
import { getWatchItAgainVideosByUser } from "../../lib/db/hasura";

import {
    getVideos,
    getPopularVideos,
    getOfflineVideos,
    getVideoDetails,
} from "../../lib/videos";
import { getToken } from "next-auth/jwt";

export async function getServerSideProps(context) {
    try {
        //==============================================
        const isDev = process.env.NODE_ENV === "development";
        //==============================================
        let props = {};
        const { req, res } = context;
        const nextAuthTokenData = await getToken({ req });
        console.log(req.cookies);
        if (!nextAuthTokenData) {
            return {
                redirect: {
                    destination: "/auth",
                    permanent: false,
                },
                props: {},
            };
        }
        const queries = [
            "Disney trailers",
            "Travel blog",
            "videos for increasing Productivity",
            "Popular videos for today",
        ];
        //==============================================
        // temporary get videos from files solution
        queries.forEach(async (query) => {
            const data = isDev
                ? getOfflineVideos(query)
                : await getVideos(query);
            switch (query) {
                case queries[0]: {
                    props.disneyVideos = data;
                    break;
                }
                case queries[1]: {
                    props.travelVideos = data;
                    break;
                }
                case queries[2]: {
                    props.productivityVideos = data;
                    break;
                }
                case queries[3]: {
                    props.popularVideos = data;
                    break;
                }
                default: {
                    break;
                }
            }
        });

        //==============================================
        // watch it again section
        // signing token to access hasura
        let dbToken = "Bearer " + signJwtToken(nextAuthTokenData);
        // get 25 last-viewed videos from database
        const watchItAgainVideos = await getWatchItAgainVideosByUser(
            nextAuthTokenData,
            dbToken
        );

        props = { ...props, watchItAgainVideos };

        //==============================================

        return { props: { ...props, nextAuthTokenData } };

        //==============================================
        // const disneyVideos = await getVideos("Disney trailers");
        // const travelVideos = await getVideos("Travel blog");
        // const productivityVideos = await getVideos(
        //     "videos for increasing Productivity"
        // );
        // const popularVideos = await getPopularVideos();
        //==============================================
    } catch (error) {
        console.error(error.message);
    }
}

export default function Home({
    disneyVideos,
    travelVideos,
    productivityVideos,
    popularVideos,
    watchItAgainVideos,
}) {
    // console.log({ ...travelVideos });
    // console.log({ ...watchItAgainVideos });
    // console.log("homepage");
    return (
        <>
            <Head>
                <title>Netflix</title>
                <meta
                    name='description'
                    content='A small app to keep track categorize and watch your favourite videos'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='_wrapper'>
                <Navbar />
                <Banner
                    title='Clifford the red dog'
                    subTitle='a very cute dog'
                />
                <Cards
                    sectionTitle='Disney'
                    cardSize={"large"}
                    videoArr={disneyVideos}
                />
                {Object.keys(watchItAgainVideos).length > 0 && (
                    <Cards
                        sectionTitle='Watch it again'
                        cardSize={"small"}
                        videoArr={watchItAgainVideos}
                    />
                )}
                <Cards
                    sectionTitle='Travel'
                    cardSize={"small"}
                    videoArr={travelVideos}
                />
                <Cards
                    sectionTitle='Productivity'
                    cardSize={"medium"}
                    videoArr={productivityVideos}
                />
                <Cards
                    sectionTitle='Popular'
                    cardSize={"small"}
                    videoArr={popularVideos}
                />
            </div>
        </>
    );
}
