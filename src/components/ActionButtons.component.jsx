import { useState } from "react";
import Image from "next/image";

const ActionButtons = ({ actionButtonsState, setActionStateHandler }) => {
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);

    function handleClickLike(e) {
        (likeActive && setLikeActive(false)) ||
            (!likeActive && setLikeActive(true));
        dislikeActive && setDislikeActive(false);
        setActionStateHandler({ liked: 1 });
    }

    function handleClickDislike(e) {
        (dislikeActive && setDislikeActive(false)) ||
            (!dislikeActive && setDislikeActive(true));
        likeActive && setLikeActive(false);
        setActionStateHandler({ liked: 2 });
    }

    return (
        <div className='action-buttons__container a-b'>
            <div
                className={`a-b__icon-container like${
                    actionButtonsState === 1 ? " _active" : ""
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
                    actionButtonsState === 2 ? " _active" : ""
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
