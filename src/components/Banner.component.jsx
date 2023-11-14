import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = (props) => {
    const handleClickCta = () => {
        console.log("cta button clicked");
    };

    return (
        <section className='banner _container'>
            <article className='banner__details'>
                <h2 className='banner__title'>{props.title}</h2>
                <h3 className='banner__subtitle'>{props.subTitle}</h3>
                <Link
                    className='banner__cta'
                    href={"#"}
                    onClick={handleClickCta}
                >
                    <Image
                        className='banner__play-icon'
                        src={"/static/icons/play.svg"}
                        width={20}
                        height={20}
                        alt='play icon'
                    />
                    {"   "}
                    <span>Watch!</span>
                </Link>
            </article>
            <div className='banner__background-image__container'>
                <div className='banner__background-image__overlay'></div>
                <Image
                    className='banner__background-image'
                    src={props.imgUrl}
                    width={1140}
                    height={760}
                    alt='an image of clifford the red dog'
                />
            </div>
        </section>
    );
};

export default Banner;
