import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useSession, signIn, signOut } from "next-auth/react";

const validateEmail = (email) => {
    const emailNorm = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    console.log({ emailNorm });
    if (emailNorm[0].includes("slava3669@gmail.com")) return emailNorm;

    return null;
};

const Auth = () => {
    const { data, status } = useSession();
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    if (router && status === "authenticated") router.push("/");

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        if (!email || !validateEmail(email))
            setMessage("Please enter a valid email!");
        else {
            setEmail(validateEmail(email));
            signIn("google");
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setEmail(input.toString());
        if (message) setMessage("");
    };

    return router && status !== "loading" ? (
        <>
            <Head>Netflix sign in page</Head>
            <figure className='auth__bg'>
                <div className='auth__bg-overlay'></div>
                <Image
                    className='auth__bg-img'
                    src={"/static/auth-bg.jpg"}
                    width={1280}
                    height={720}
                    alt='background image'
                />
            </figure>
            <div className='_wrapper-auth'>
                <header className='auth__header _container-plus'>
                    <Link className='nav__logo-link auth__logo-link' href={"/"}>
                        <Image
                            className='nav__logo-img'
                            src={"/static/icons/netflix-logo.svg"}
                            width={70}
                            height={70}
                            alt='netflix logo'
                        />
                    </Link>
                </header>
                <section className='auth _container'>
                    <form action='' method='get' className='auth__form form'>
                        <div className='form__container'>
                            <h1 className='form__title'>Sign In</h1>
                            <input
                                type='email'
                                name='email'
                                value={email}
                                placeholder='Email address'
                                className='form__email'
                                onChange={handleInputChange}
                                required
                            />
                            {message && (
                                <p className='form__message'>{message}</p>
                            )}
                            <div className='form__btn-container'>
                                <input
                                    onClick={handleAuthSubmit}
                                    className='form__btn'
                                    type='submit'
                                    value='Submit'
                                />
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    ) : (
        <h1>Loading ... </h1>
    );
};

export default Auth;