import { NextResponse, NextRequest } from "next/server";

export function middleware(request) {
    if (request.nextUrl.pathname.startsWith("/video")) {
        // const cookie = request.cookies.get("hasura-token")?.value;
        // // console.log({ cookie });
        // const response = NextResponse.next();
        // response.cookies.set({
        //     name: "hasura-token",
        //     value: cookie,
        //     // httpOnly: true,
        // });
        // return response;
        // return NextResponse.redirect("http://localhost:3000/api/myVideo");
    }
}

// export const config = {
//     matcher: ["/video/:path"],
// };
