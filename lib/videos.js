// ===================================================
// temporary solution with json data file imports
import videoDataDisney from "@/data/youtube-api-response-disney-trailers.json";
import videoDataPopular from "@/data/youtube-api-response-popular.json";
import videoDataProductivity from "@/data/youtube-api-response-productivity.json";
import videoDataTravel from "@/data/youtube-api-response-travel-blog.json";
// ===================================================
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const BASE_URL = "https://youtube.googleapis.com/youtube/v3/";
const KEY_URL = `&key=${YOUTUBE_API_KEY}`;

// search youtube videos by query
export const getVideos = async (query) => {
    const SEARCH_URL = `search?part=snippet&q=${encodeURI(
        query
    )}&maxResults=25`;

    const url = BASE_URL + SEARCH_URL + KEY_URL;

    return await fetchVideos(url);
};

// get youtube videos from "mostPopular" chart within a specific region
export const getPopularVideos = async () => {
    const POPULAR_URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=RU`;
    const url = BASE_URL + POPULAR_URL + KEY_URL;

    return await fetchVideos(url);
};

// get youtube video details (specified by id)
export const getVideoDetails = async (id) => {
    const DETAILS_URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
    const url = BASE_URL + DETAILS_URL + KEY_URL;

    return await fetchVideos(url);
};

// fetches videos by specified url
export const fetchVideos = async (url) => {
    try {
        const apiResponse = await fetch(url);
        const apiData = await apiResponse.json();

        const data = apiData.items;
        return getOutput(data);
    } catch (error) {
        console.error("Error while fetching youtube api. ", error);
        return [];
    }
};

// forms an array of data objects from fetched data
const getOutput = (data) => {
    if (data?.error) {
        console.error("Youtube API error.", data.error.errors[0].reason);
        return [];
    }

    const output = data.map((videoObj, idx) => {
        const video_id = videoObj?.id?.videoId
            ? videoObj.id.videoId
            : typeof videoObj.id === "string"
            ? videoObj.id
            : null;
        return {
            video_id,
            title: videoObj?.snippet?.title,
            channelTitle: videoObj?.snippet?.channelTitle,
            viewCount: videoObj?.statistics?.viewCount || null,
            desc: videoObj?.snippet?.description,
            time:
                videoObj?.snippet?.publishTime ||
                videoObj?.snippet?.publishedAt,
            imgUrl:
                videoObj?.snippet?.thumbnails?.maxres?.url ||
                videoObj?.snippet?.thumbnails?.high?.url,
            tags: videoObj?.snippet?.tags || null,
            cast: ["Darby Camp", "Jack Whitehall", "Izaac Wang"],
        };
    });

    return output;
};

// ===================================================
// temporary solution with json data file imports
export const getOfflineVideos = (query) => {
    let data;
    const queries = [
        "Disney trailers",
        "Travel blog",
        "videos for increasing Productivity",
        "Popular videos for today",
    ];

    switch (query) {
        case queries[0]: {
            data = videoDataDisney.items;
            break;
        }
        case queries[1]: {
            data = videoDataTravel.items;
            break;
        }
        case queries[2]: {
            data = videoDataProductivity.items;
            break;
        }
        case queries[3]: {
            data = videoDataPopular.items;
            break;
        }
        default: {
            break;
        }
    }

    return getOutput(data);
};
// ===================================================
