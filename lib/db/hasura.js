async function fetchGraphQL(
    operationsDoc,
    operationName = "MyQuery",
    variables = {}
) {
    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
        method: "POST",
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlZ5YWNoZXNsYXYgS290bHlhcm92IiwiaWF0IjoxNzAyMzgyNjIyLCJleHAiOjE3MDMyNDY1NjQsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLXVzZXItaWQiOiIxMDgwODQwNDYxNDc0LXViM2xlMzlnMmh2NG10ajFoYWZndDB0ZWRkZDZjazBnLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIn19.5XQqkZYs8zcn2sEHwxg2z_lzJc9_mgUgHutTRf6acyY",
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
