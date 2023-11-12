import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = (props) => {
    return (
        <section className='banner _container'>
            <h2 className='banner__title'>{props.title}</h2>
            <h3 className='banner__subtitle'>{props.subTitle}</h3>
            <Link className='banner__cta' href={"#"}></Link>
            <div className='banner__background-image__container'>
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
