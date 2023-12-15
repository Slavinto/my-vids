import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { signIn } from "next-auth/react";
import login from "./api/login";

const validateEmail = (email) => {
    const emailNorm = String(email).toLowerCase();
    // .match(
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // );
    if (emailNorm) return emailNorm;

    return null;
};

export async function getServerSideProps(context) {
    const session = await getServerSession(
        context?.req,
        context?.res,
        authOptions
    );
    //==============================================

    if (session) {
        const db_user = await login(
            {
                method: "POST",
                headers: {
                    user_login: session.user.email,
                    user_name: session.user.name,
                },
            },
            {}
        );
    }
    //==============================================
    return session
        ? {
              redirect: {
                  destination: "/",
                  permanent: false,
              },
              props: {},
          }
        : {
              props: {
                  session: null,
              },
          };
    //==============================================
}

const Auth = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

    console.log("auth component rendering");

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

    return (
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
    );
};

export default Auth;
