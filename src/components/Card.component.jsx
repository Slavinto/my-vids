import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const defaultImgUrl =
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Card = ({ imgUrl = defaultImgUrl, size = "medium" }) => {
    const router = useRouter();
    const [imgPath, setImgPath] = useState(imgUrl);

    const handleClickCard = (e) => {
        e.preventDefault();
        router.push("/video/test");
    };

    const handleImageError = (e) => {
        e.preventDefault();
        console.log("error detected");
        setImgPath(defaultImgUrl);
    };

    let width = 0;
    let height = 0;

    switch (size) {
        case "large": {
            width = 218;
            height = 434;
            break;
        }
        case "medium": {
            width = 158;
            height = 280;
            break;
        }
        case "small": {
            width = 300;
            height = 170;
            break;
        }
        default: {
            break;
        }
    }

    return (
        <div className='card' onClick={handleClickCard}>
            <figure className={`card__image-container -${size}`}>
                <Image
                    src={imgPath}
                    onError={handleImageError}
                    className='card__image'
                    alt='a film card'
                    width={width}
                    height={height}
                />
            </figure>
        </div>
    );
};

export default Card;
