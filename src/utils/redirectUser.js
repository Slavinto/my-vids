import { getToken } from "next-auth/jwt";
import { signJwtToken } from "../../lib/jwt";

export default async function redirectUser(context) {
    try {
        const { req, res } = context;
        const nextAuthTokenData = await getToken({ req });
        if (!nextAuthTokenData) {
            return {
                props: {},
                redirect: {
                    destination: "/auth",
                    permanent: false,
                },
            };
        }

        // signing token to access hasura
        let dbToken = "Bearer " + signJwtToken(nextAuthTokenData);
        return { nextAuthTokenData, dbToken };
    } catch (error) {
        console.error(error.message);
        return { error: error.message };
    }
}
