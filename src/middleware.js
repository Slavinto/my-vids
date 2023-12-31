import { NextResponse } from "next/server";

export function middleware(request) {
    const response = NextResponse.next();
    const redirectAuth = NextResponse.redirect(`${request.nextUrl}/auth`);
    const redirectHome = NextResponse.redirect(`${request.nextUrl}`);

    // const allCookies = request.cookies
    //     .getAll()
    //     .filter((cookie) => cookie.name !== "undefined");
    // // =====================================
    // const hasuraToken = allCookies.find(
    //     (cookie) => cookie.name === "hasura-token"
    // );
    // if (Object.keys(hasuraToken).length > 0) {
    //     if (request.nextUrl.pathname.startsWith("/api/auth")) {
    //         return redirectHome;
    //     }
    // } else if (!request.nextUrl.pathname.startsWith("/api/auth")) {
    //     return redirectAuth;
    // }

    // =====================================

    if (request.nextUrl.pathname.startsWith("/video")) {
    }

    if (request.nextUrl.pathname.startsWith("/api/auth")) {
        // if (request.cookies.has("hasura-token")) {
        //     request.cookies.delete("hasura-token");
        // }
        // allCookies.forEach((cookie) => {
        //     response.cookies.set(cookie.name, cookie.value);
        // });
        // =====================================
        // const reqHeaders = new Headers(request.headers);
        // reqHeaders.set("hasura-token", "");
        // NextResponse.next({
        //     request: { headers: reqHeaders },
        // });
    }
    // console.log(response.headers);
    // console.log(response.cookies);
    return response;
    // console.log(request.nextUrl.pathname.startsWith("/api/auth"));
}

// export const config = {
//     matcher: ["/video/:path"],
// };
