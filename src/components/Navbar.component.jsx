import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import { useRouter } from "next/router";

const Navbar = (props) => {
    const [showUserSignout, setShowUserSignout] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { data, status } = useSession();
    if (status === "authenticated" && !user) setUser(data.user);

    const handleClickHome = (e) => {
        e.preventDefault();
        router.push("/");
    };

    const handleClickMyList = (e) => {
        e.preventDefault();
        router.push("/browse/my-list");
    };

    const handleClickUser = (e) => {
        e.preventDefault();
        setShowUserSignout(!showUserSignout);
    };

    const handleClickSignOut = (e) => {
        signOut();
    };

    return (
        <section className='nav'>
            <div className='nav__container _container-plus'>
                <Link className='nav__logo-link' href={"/"}>
                    <Image
                        className='nav__logo-img'
                        src={"/static/icons/netflix-logo.svg"}
                        width={70}
                        height={70}
                        alt='netflix logo'
                    />
                </Link>

                <ul className='nav__list'>
                    <li className='nav__list-item' onClick={handleClickHome}>
                        Home
                    </li>
                    {user && (
                        <li
                            className='nav__list-item'
                            onClick={handleClickMyList}
                        >
                            My List
                        </li>
                    )}
                </ul>
                <div className='nav__user-container'>
                    {user ? (
                        <Link
                            href={"#"}
                            onClick={handleClickUser}
                            className='nav__user'
                        >
                            {data.user.email}
                            <Image
                                className='nav__user-icon'
                                src='/static/icons/expand-more.svg'
                                alt='user expand icon'
                                width={24}
                                height={24}
                            />
                        </Link>
                    ) : (
                        <Link href={"/auth"} className='nav__user'>
                            Sign In
                        </Link>
                    )}
                    {user && showUserSignout && (
                        <Link
                            href={"#"}
                            className='nav__user-signout'
                            onClick={handleClickSignOut}
                        >
                            <span>Sign Out</span>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};
export default Navbar;
