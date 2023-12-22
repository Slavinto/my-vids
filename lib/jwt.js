import jwt from "jsonwebtoken";

export function signJwtToken(user_data) {
    const token = jwt.sign(
        {
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 10 * 24 * 60 * 60),
            user_data,
            "https://hasura.io/jwt/claims": {
                "X-Hasura-Default-Role": "user",
                "X-Hasura-Allowed-Roles": ["user", "admin"],
                "X-Hasura-User-Email": user_data?.email,
                // "X-Hasura-User-Id": user_data?.user_id || null,
            },
        },
        process.env.HASURA_APPLICATION_SECRET
    );
    console.log({ user_data });
    return token;
}

export function validateJwtToken(token) {
    try {
        const decoded = jwt.verify(
            token,
            process.env.HASURA_APPLICATION_SECRET
        );
        return decoded;
    } catch (error) {
        console.error("Error! Invalid token. " + error.message);
        return null;
    }
}
