import { useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { getVideoDetails } from "../../../lib/videos";
import Navbar from "@/components/Navbar.component";

Modal.setAppElement("#__next");

const bannerVideos = ["mYfJxlgR2jw", "KCPEHsAViiQ", "4zH5iYM4wJo"];

function printArr(arr) {
    if (!arr) return "";
    return arr.reduce((acc, el, idx) => {
        return idx < arr.length - 1 ? `${acc} ${el} | ` : ` ${acc} ${el}`;
    }, "");
}

const Video = (props) => {
    const router = useRouter();
    if (!router) return;

    const {
        id,
        title,
        channelTitle,
        viewCount,
        time,
        imgUrl,
        tags,
        cast,
        desc,
    } = props.video;

    return (
        <div className='_wrapper _container modal__wrapper'>
            <Navbar />
            <Modal
                isOpen={true}
                className={"modal"}
                overlayClassName={"modal__overlay _container"}
                parentSelector={() => document.querySelector("#__next")}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => router.back()}
                contentLabel='Watch the video'
                // style={customStyles}
            >
                <iframe
                    id='ytplayer'
                    className='modal__player'
                    type='text/html'
                    width='100%'
                    height='360'
                    src={`http://www.youtube.com/embed/${id}?autoplay=0&controls=0`}
                    frameBorder='0'
                ></iframe>
                <article className='modal__details details'>
                    <p className='details__datetime'>{time}</p>
                    <p className='details__cast'>
                        <span>Cast: </span>
                        {printArr(cast)}
                    </p>
                    <p className='details__tags'>{printArr(tags)}</p>
                    <p className='details__views'>
                        <span>View Count: </span>
                        {viewCount}
                    </p>
                    <div className='details__description-container'>
                        <h3 className='details__description-title'>
                            {title} - {channelTitle}
                        </h3>

                        <p className='details__description-text'>{desc}</p>
                    </div>
                </article>
            </Modal>
        </div>
    );
};

export default Video;

export async function getStaticPaths() {
    const paths = bannerVideos.map((id) => {
        return {
            params: { id },
        };
    });
    return {
        paths,
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }) {
    const videoArr = await getVideoDetails(params.id);
    console.log({ videoArr });
    return {
        props: { video: videoArr[0] },
        revalidate: 10,
    };
}

// ====================================================================
// dummy data
// const video = {
//     id: params.id,
//     title: "Clifford the Red Dog",
//     channelTitle: "Paramount Pictures",
//     viewCount: 10000000000,
//     time: "01-01-2022",
//     imgUrl: "/public/static/clifford.jpg",
//     tags: ["comedy", "animation", "kids"],
//     cast: ["Darby Camp", "Jack Whitehall", "Izaac Wang"],
//     desc:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. A quaerat sapiente, fugiat consequuntur voluptatum laborum eius ipsam dolores placeat distinctio magnam tempore, autem corrupti deleniti in nostrum laudantium delectus tenetur.",
// };
// ====================================================================

// const customStyles = {
//     overlay: {
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(255, 255, 255, 0.75)",
//         borderRadius: ".5rem",
//     },
//     content: {
//         position: "absolute",
//         top: "4rem",
//         left: "4rem",
//         right: "4rem",
//         bottom: "4rem",
//         border: "1px solid #ccc",
//         background: "#fff",
//         overflow: "auto",
//         WebkitOverflowScrolling: "touch",
//         borderRadius: ".5rem",
//         outline: "none",
//         padding: "2rem",
//     },
// };
