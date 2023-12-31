import cookie from "cookie";
const MAX_AGE = 10 * 24 * 60 * 60;

export function setTokenCookie(prefix = "app", token, res) {
    const setCookie = cookie.serialize(`${prefix}-token`, token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE),
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        httpOnly: true,
    });

    res.setHeader("Set-Cookie", setCookie);
}

export function removeHasuraCookie() {}
