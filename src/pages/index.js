import Head from "next/head";
import Banner from "@/components/Banner.component";
import Navbar from "@/components/Navbar.component";
import Card from "@/components/Card.component";
import Cards from "@/components/Cards.component";

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
                <section className='all-cards _container'>
                    <Cards>
                        <Card size='large' />
                        <Card size='large' />
                        <Card size='large' />
                    </Cards>
                    <Cards>
                        <Card size='medium' />
                        <Card size='medium' />
                        <Card size='medium' />
                    </Cards>
                    <Cards>
                        <Card size='small' />
                        <Card size='small' />
                        <Card size='small' />
                    </Cards>
                </section>
            </div>
        </>
    );
}
