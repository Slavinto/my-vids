export async function updateVideoData(newData = null) {
    try {
        const response = await fetch(`/api/myVideo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        });
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error({
            message:
                "Something went wrong updating video parameters in database.",
            error: error.message,
        });
    }
}

export async function insertVideoData(videoId) {
    try {
        const response = await fetch(`/api/myVideo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ video_id: videoId }),
        });
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error({
            message:
                "Something went wrong inserting video parameters in database.",
            error: error.message,
        });
    }
}
