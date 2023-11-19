// import videoData from "@/data/youtube-api-response.json";

export const getVideos = async (query) => {
    // const queries = ['Disney trailers', 'Watch it again', 'Travel', 'Productivity', 'Popular'];
    try {
        const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=25&key=${YOUTUBE_API_KEY}`;

        const apiResponse = await fetch(url);
        const apiData = await apiResponse.json();

        const data = apiData.items;

        const output = data.map((videoObj, idx) => {
            return {
                id: videoObj?.id?.videoId || videoObj?.etag,
                title: videoObj?.snippet?.title,
                desc: videoObj?.snippet?.description,
                time: videoObj?.snippet?.publishTime,
                imgUrl: videoObj?.snippet?.thumbnails?.high?.url,
            };
        });

        return output;
    } catch (error) {
        console.error("Error while fetching youtube api. ", error);
    }
};
