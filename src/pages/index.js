import Head from "next/head";
import Banner from "@/components/Banner.component";
import Navbar from "@/components/Navbar.component";
import Cards from "@/components/Cards.component";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import jwt from "jsonwebtoken";

import {
    getVideos,
    getPopularVideos,
    getOfflineVideos,
} from "../../lib/videos";

export async function getServerSideProps(context) {
    //==============================================
    const isDev = true;
    //==============================================
    let props = {};

    const queries = [
        "Disney trailers",
        "Travel blog",
        "videos for increasing Productivity",
        "Popular videos for today",
    ];
    //==============================================
    // temporary get videos from files solution
    queries.forEach(async (query) => {
        const data = isDev ? getOfflineVideos(query) : await getVideos(query);
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
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    //==============================================
    // console.log({ ...props });
    // console.log({ session });

    return session
        ? {
              props: { ...props, session },
          }
        : {
              redirect: {
                  destination: "/auth",
                  permanent: false,
              },
              props: {},
          };

    //==============================================
    // const disneyVideos = await getVideos("Disney trailers");
    // const travelVideos = await getVideos("Travel blog");
    // const productivityVideos = await getVideos(
    //     "videos for increasing Productivity"
    // );
    // const popularVideos = await getPopularVideos();
}

export default function Home({
    disneyVideos,
    travelVideos,
    productivityVideos,
    popularVideos,
}) {
    // console.log({ ...disneyVideos });
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
                {/* <Cards
                    sectionTitle='Watch it again'
                    cardSize={"small"}
                    videoArr={videoArr[1]}
                /> */}
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
