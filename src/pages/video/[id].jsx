import { useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const Video = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <Modal
                isOpen={true}
                className={"modal"}
                parentSelector={() => document.querySelector("#__next")}
                // style={customStyles}
                shouldCloseOnEsc={true}
                overlayClassName={"modal__overlay _container"}
                onRequestClose={() => {}}
                contentLabel='Watch the video'
            >
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi, esse in? Similique illo saepe unde pariatur
                    ipsum, consequatur mollitia aliquid? Natus, cum pariatur
                    ipsam nihil quis architecto, porro inventore vel, labore
                    earum possimus nostrum dolorum distinctio saepe? Illo ipsa
                    voluptas nisi saepe eius, maxime unde nulla iusto sapiente
                    atque, sequi id ipsam! Velit inventore dolorum dignissimos
                    totam quibusdam odit sint sit quasi temporibus quis itaque
                    repudiandae doloremque quod saepe iure quo tempora
                    recusandae facilis ratione harum reiciendis, nostrum amet
                    voluptates vel. Unde ullam consectetur accusantium
                    reiciendis et. Qui perferendis numquam consequatur harum
                    omnis veritatis! Tenetur maxime est quam illo laudantium.
                </h1>
            </Modal>
        </div>
    );
};

export default Video;
