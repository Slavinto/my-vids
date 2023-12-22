import { useState } from "react";
import Image from "next/image";

const ActionButtons = () => {
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);

    function handleClickLike(e) {
        (likeActive && setLikeActive(false)) ||
            (!likeActive && setLikeActive(true));
        dislikeActive && setDislikeActive(false);
    }
    function handleClickDislike(e) {
        (dislikeActive && setDislikeActive(false)) ||
            (!dislikeActive && setDislikeActive(true));
        likeActive && setLikeActive(false);
    }

    return (
        <div className='action-buttons__container a-b'>
            <div
                className={`a-b__icon-container like${
                    likeActive ? " _active" : ""
                }`}
                onClick={handleClickLike}
            >
                <Image
                    width={24}
                    height={24}
                    src='/static/icons/thumb_up.svg'
                    alt='like button icon'
                />
            </div>
            <div
                className={`a-b__icon-container dislike${
                    dislikeActive ? " _active" : ""
                }`}
                onClick={handleClickDislike}
            >
                <Image
                    width={24}
                    height={24}
                    src='/static/icons/thumb_down.svg'
                    alt='dislike button icon'
                />
            </div>
        </div>
    );
};

export default ActionButtons;
