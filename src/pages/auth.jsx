import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { signIn } from "next-auth/react";

import { getToken } from "next-auth/jwt";
import { getDbUser, insertDbUser } from "../../lib/db/hasura";
import { signJwtToken } from "../../lib/jwt";
import { setTokenCookie } from "../../lib/cookies";

const validateEmail = (email) => {
    const emailNorm = String(email).toLowerCase();
    // .match(
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // );
    if (emailNorm) return emailNorm;

    return null;
};

export async function getServerSideProps(context) {
    try {
        let user = null;
        const { req, res } = context;
        //==============================================
        const nextAuthToken = await getToken({
            req,
        });

        if (!nextAuthToken)
            return {
                props: {
                    message: "Error: Authentication failed!",
                },
            };

        const hasuraToken = "Bearer " + signJwtToken(nextAuthToken);
        const hasuraCookie = setTokenCookie(hasuraToken);
        console.log({ hasuraCookie });
        const { data, error } = await getDbUser(
            nextAuthToken.email,
            hasuraToken
        );

        if (data?.users.length === 0 && !error) {
            const { data, error } = await insertDbUser(
                nextAuthToken,
                hasuraToken
            );
            if (error) {
                return {
                    props: {
                        user: null,
                        message: "Error inserting user in database!",
                    },
                };
            }
            user = data?.users[0];
        } else if (data?.users.length !== 0) {
            user = data.users[0];
        } else if (error) {
            return {
                props: {
                    user: null,
                    message: "Error: Can not get user from database!",
                },
            };
        }
        //==============================================
        return user
            ? {
                  redirect: {
                      destination: "/",
                      permanent: false,
                  },
                  props: {},
              }
            : {
                  props: {
                      user: null,
                  },
              };
    } catch (error) {
        console.error("Error: " + error.message);
    }

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
