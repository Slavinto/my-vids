import cookie from "cookie";
const MAX_AGE = 10 * 24 * 60 * 60;

export function setTokenCookie(token) {
    return cookie.serialize("token", token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE),
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
}
