import videoData from "@/data/youtube-api-response.json";

export const getVideos = () => {
    const data = videoData.items;
    const output = data.map((videoObj) => {
        return {
            id: videoObj.id.videoId,
            name: videoObj.snippet.title,
            desc: videoObj.snippet.description,
            time: videoObj.snippet.publishTime,
            imgUrl: videoObj.snippet.thumbnails.high.url,
        };
    });
    return output;
};
