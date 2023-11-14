import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

const Navbar = (props) => {
    const [showUserSignout, setShowUserSignout] = useState(false);
    const { username } = props;
    const router = useRouter();

    const handleClickHome = (e) => {
        e.preventDefault();
        router.push("/");
    };

    const handleClickMyList = (e) => {
        e.preventDefault();
        router.push("/browse/my-list");
    };

    return (
        <section className='nav'>
            <div className='nav__container'>
                <Link className='nav__logo-link' href={"#"}>
                    <Image
                        className='nav__logo-img'
                        src={"/static/icons/netflix-logo.svg"}
                        width={80}
                        height={80}
                        alt='netflix logo'
                    />
                </Link>

                <ul className='nav__list'>
                    <li className='nav__list-item' onClick={handleClickHome}>
                        Home
                    </li>

                    <li className='nav__list-item' onClick={handleClickMyList}>
                        My List
                    </li>
                </ul>
                <div className='nav__user-container'>
                    <Link href={"#"} className='nav__user'>
                        {username}
                        <Image
                            className='nav__user-icon'
                            src='/static/icons/expand-more.svg'
                            alt='user expand icon'
                            width={24}
                            height={24}
                        />
                    </Link>
                    <Link href={"/login"} className='nav__user-signout'>
                        <span>Sign Out</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default Navbar;
