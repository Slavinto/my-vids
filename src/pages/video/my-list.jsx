import Navbar from "@/components/Navbar.component";
import Cards from "@/components/Cards.component";
import redirectUser from "@/utils/redirectUser";
import { getLikedVideos } from "../../../lib/db/hasura";
import Head from "next/head";

export async function getServerSideProps(context) {
    try {
        const {
            nextAuthTokenData,
            dbToken,
            redirect = null,
            error = null,
        } = await redirectUser(context);
        if (redirect || error) {
            return { redirect };
        }
        const likedVideos = await getLikedVideos(nextAuthTokenData, dbToken);
        return {
            props: { likedVideos },
        };
    } catch (error) {
        console.error(error.message);
        return {
            props: { error: error.message },
        };
    }
}

const MyList = (props) => {
    const { likedVideos } = props;
    return (
        <div className='_wrapper'>
            <Head>
                <title>My List</title>
            </Head>
            <Navbar />
            <div className='liked _container'>
                <Cards
                    className='liked__cards-container'
                    sectionTitle='My favourite videos'
                    cardSize='small'
                    videoArr={likedVideos}
                />
            </div>
        </div>
    );
};

export default MyList;
