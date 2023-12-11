async function fetchGraphQL(
    operationsDoc,
    operationName = "MyQuery",
    variables = {}
) {
    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
        method: "POST",
        headers: {
            "x-hasura-admin-secret":
                process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
        }),
    });

    return await result.json();
}

export default fetchGraphQL;
