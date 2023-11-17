import Head from "next/head";
import Banner from "@/components/Banner.component";
import Navbar from "@/components/Navbar.component";
import Cards from "@/components/Cards.component";

import { getVideos } from "../../lib/videos";

const videoArr = getVideos();

export default function Home() {
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
                    videoArr={videoArr}
                />
                <Cards
                    sectionTitle='Watch it again'
                    cardSize={"medium"}
                    videoArr={videoArr}
                />
                <Cards
                    sectionTitle='Favourites'
                    cardSize={"small"}
                    videoArr={videoArr}
                />
            </div>
        </>
    );
}
