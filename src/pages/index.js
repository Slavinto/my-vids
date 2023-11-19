import Head from "next/head";
import Banner from "@/components/Banner.component";
import Navbar from "@/components/Navbar.component";
import Cards from "@/components/Cards.component";

import { getVideos } from "../../lib/videos";

export async function getServerSideProps() {
    const queries = [
        "Disney trailers",
        "Travel blog",
        "videos for increasing Productivity",
        "Popular videos for today",
    ];
    const disneyVideos = await getVideos("Disney trailers");
    const travelVideos = await getVideos("Travel blog");
    const productivityVideos = await getVideos(
        "videos for increasing Productivity"
    );
    const popularVideos = await getVideos("Popular videos for today");
    console.log({ disneyVideos });
    return {
        props: {
            disneyVideos,
            travelVideos,
            productivityVideos,
            popularVideos,
        },
    };
}

export default function Home({
    disneyVideos,
    travelVideos,
    productivityVideos,
    popularVideos,
}) {
    // console.log({ ...disneyVideos });
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
                <Navbar username={"slava3669@gmail.com"} />
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
