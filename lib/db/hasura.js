export async function checkDbUser(authToken, dbToken) {
    try {
        let user = null;

        const { data: usersExist, error } = await getDbUser(
            authToken.email,
            dbToken
        );

        if (error) {
            return {
                user: null,
                message: "Error: Can not get user from database!",
            };
        } else if (usersExist?.users.length !== 0) {
            user = usersExist.users[0];
        } else if (usersExist?.users.length === 0) {
            const { data: newUsers, error } = await insertDbUser(
                authToken,
                dbToken
            );
            if (error) {
                return {
                    user: null,
                    message: "Error inserting user in database!",
                };
            }

            user = newUsers?.insert_users_one;
        }

        return user;
    } catch (error) {
        console.error("Error: " + error.message);
    }
}

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

export async function getUserVideo(videoId, user, token) {
    const variables = {
        userEmail: user.email,
        videoId,
    };

    const gqlGetVideo = `
    query getVideoData ($userEmail: String!, $videoId: String!) {
      user_videos(where: {user_email: {_eq: $userEmail}, video_id: {_eq: $videoId}}) {
        id
        user_email
        video_id
        watched
        liked
      }
    }
  `;

    return await fetchGraphQL(gqlGetVideo, "getVideoData", variables, token);
}

export async function insertOrUpdateDbVideo(
    operation = "update",
    video,
    token
) {
    const { user_email, video_id, watched, liked } = video;

    // console.log({ video });
    const variables = {
        userEmail: user_email,
        videoId: video_id,
        watched,
        liked,
    };

    const gqlUpdateVideo = `mutation setUserVideo ($userEmail: String!, $videoId: String!, $watched: Boolean, $liked: Int) {
        update_user_videos(where: {user_email: {_eq: $userEmail}, video_id: {_eq: $videoId}}, _set: {liked: $liked, watched: $watched}) {
            returning {
                id
                user_email
                video_id
                watched
                liked
            }     
        }
      }`;

    const gqlInsertVideo = `mutation insertVideo ($userEmail: String!, $videoId: String!, $watched: Boolean, $liked: Int) {
        insert_user_videos_one(object: {user_email: $userEmail, video_id: $videoId, watched: $watched, liked: $liked}) {
            user_email
            video_id
            watched
            liked
        }
    }`;

    let output;
    if (operation === "update") {
        const { data } = await fetchGraphQL(
            gqlUpdateVideo,
            "setUserVideo",
            variables,
            token
        );
        const { returning } = data?.update_user_videos;
        output = returning[0];
    } else if (operation === "insert") {
        const { data } = await fetchGraphQL(
            gqlInsertVideo,
            "insertVideo",
            variables,
            token
        );
        output = { ...data?.insert_user_videos_one };
        console.log({ data_from_insert_operation: output });
    } else {
        output = { message: "Error. Invalid operation.", data: null };
    }

    return output;
}

export async function checkDbUserVideo(userData, videoId, token) {
    try {
        let video = null;

        const { data: videoExist, errors } = await getUserVideo(
            videoId,
            userData,
            token
        );

        if (errors) {
            return {
                video: null,
                message: "Error: Can not get video from database!",
                errors: JSON.stringify(errors),
            };
        } else if (videoExist?.user_videos.length !== 0) {
            video = videoExist.user_videos[0];
        } else if (videoExist?.user_videos.length === 0) {
            const videoConstructor = {
                user_email: userData.email,
                video_id: videoId,
                watched: "False",
                liked: 0,
            };

            video = await insertOrUpdateDbVideo(
                "insert",
                videoConstructor,
                token
            );
        }
        return video;
    } catch (error) {
        console.error(error);
    }
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
