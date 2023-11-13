import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = (props) => {
    const { username } = props;
    return (
        <section className='nav'>
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
                <li className='nav__list-item'>Home</li>
            </ul>
            <ul className='nav__list'>
                <li className='nav__list-item'>My List</li>
            </ul>
            <div className='nav__user-actions'>
                <Link href={"#"} className='nav__user'>
                    {username}
                </Link>
                <Link href={"#"} className='nav__sign-out'>
                    Sign Out
                </Link>
            </div>
        </section>
    );
};
export default Navbar;
