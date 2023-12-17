export async function getDbUser(login, token) {
    const variables = {
        login,
    };

    const gqlGetUser = `query getUser($login: String!) {
        users(where: {user_email: {_eq: $login}}) {
            id
            user_name
            user_email
        }
    }`;

    return await fetchGraphQL(gqlGetUser, "getUser", variables, token);
}

export async function insertDbUser(user, token) {
    const variables = {
        userEmail: user.email,
        userName: user.name,
    };

    const gqlInsertUser = `mutation insertUser ($userEmail: String!, $userName: String!) {
        insert_users_one(object: {user_email: $userEmail, user_name: $userName}) {
            user_email
            user_name
        }
    }`;

    return await fetchGraphQL(gqlInsertUser, "insertUser", variables, token);
}

async function fetchGraphQL(
    operationsDoc,
    operationName = "GetUser",
    variables = {},
    token = ""
) {
    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
        method: "POST",
        headers: {
            Authorization: token,
            "Content-type": "Application/JSON",
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
        }),
    });

    return await result.json();
}

// export default fetchGraphQL;
