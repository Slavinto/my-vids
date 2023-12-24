import {
    checkDbUserVideo,
    insertOrUpdateDbVideo,
} from "../../../lib/db/hasura";
import { signJwtToken, validateJwtToken } from "../../../lib/jwt";

const myVideo = async (req, res) => {
    if (req.method !== "POST")
        return res
            .status(400)
            .json({ message: "Error! Invalid request method." });

    try {
        const bearerToken = req.cookies["hasura-token"];
        const token = bearerToken?.split("Bearer ")[1];
        // getting currently open video id
        // const { video_id: videoId, video_data } = req.headers;
        const { video_id: videoId } = req.headers;
        const { videoData } = req.body
            ? JSON.parse(req.body)
            : { videoData: null };
        console.log(req.body);
        console.log({ videoData });
        // let videoData = null;
        // if (video_data) {
        //     videoData = JSON.parse(video_data);
        // }
        // console.log({ token });
        if (!token)
            return res
                .status(401)
                .json({ message: "Error! Something went wrong during login." });

        const token_data = validateJwtToken(token);
        if (!token_data) {
            return res.status(403).json({ message: "Error! Invalid token." });
        }
        const { user_data } = token_data;
        //======================================
        // handling result
        const result = videoData
            ? await insertOrUpdateDbVideo("update", videoData, bearerToken)
            : await checkDbUserVideo(user_data, videoId, bearerToken);

        if (result?.errors) {
            return res.status(500).json({
                message: "Error.",
                data: JSON.stringify(result.errors),
            });
        }
        return res.status(200).json({
            message: "Data successfully received from database.",
            data: result,
        });

        //======================================
    } catch (error) {
        console.error(error);
    }
};

export default myVideo;
