import { useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";

Modal.setAppElement("#__next");

function printArr(arr) {
    return arr.reduce((acc, el, idx) => {
        return idx < arr.length - 1 ? `${acc} ${el} | ` : ` ${acc} ${el}`;
    }, "");
}

const Video = () => {
    const router = useRouter();
    if (!router) return;
    // ====================================================================
    // dummy data
    const video = {
        id: router.query.id,
        title: "Clifford the Red Dog",
        channelTitle: "Paramount Pictures",
        viewCount: 10000000000,
        publishTime: "01-01-2022",
        img: "/public/static/clifford.jpg",
        logo: "/public/static/clifford-small.jpg",
        tags: ["comedy", "animation", "kids"],
        cast: ["Darby Camp", "Jack Whitehall", "Izaac Wang"],
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. A quaerat sapiente, fugiat consequuntur voluptatum laborum eius ipsam dolores placeat distinctio magnam tempore, autem corrupti deleniti in nostrum laudantium delectus tenetur.",
    };
    // ====================================================================

    const {
        id,
        title,
        channelTitle,
        viewCount,
        publishTime,
        img,
        logo,
        tags,
        cast,
        description,
    } = video;

    return (
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
                <p className='details__datetime'>{publishTime}</p>
                <p className='details__cast'>
                    <span>Cast: </span>
                    {printArr(cast)}
                </p>
                <p className='details__tags'>{printArr(tags)}</p>
                <p className='details__views'>
                    <span>View Count: </span>
                    {viewCount}
                </p>
                <p className='details__description'>{description}</p>
            </article>
        </Modal>
    );
};

export default Video;

const customStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        borderRadius: ".5rem",
    },
    content: {
        position: "absolute",
        top: "4rem",
        left: "4rem",
        right: "4rem",
        bottom: "4rem",
        border: "1px solid #ccc",
        background: "#fff",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: ".5rem",
        outline: "none",
        padding: "2rem",
    },
};
