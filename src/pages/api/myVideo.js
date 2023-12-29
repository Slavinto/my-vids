import {
    checkDbUserVideo,
    insertOrUpdateDbVideo,
} from "../../../lib/db/hasura";
import { validateJwtToken } from "../../../lib/jwt";

const myVideo = async (req, res) => {
    if (req.method !== "POST")
        return res
            .status(400)
            .json({ message: "Error! Invalid request method." });

    try {
        const bearerToken = req.cookies["hasura-token"];
        const token = bearerToken?.split("Bearer ")[1];
        // getting currently open video id
        // const { video_id: videoId } = req.headers;
        console.log({ body: req.body });
        // const videoData = Object.keys(req.body).length !== 0 ? req.body : null;
        const videoData = req.body;
        console.log({ videoData });
        const { video_id: videoId } = videoData;

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
        const result =
            Object.keys(videoData).length > 1
                ? await insertOrUpdateDbVideo("update", videoData, bearerToken)
                : await checkDbUserVideo(user_data, videoId, bearerToken);
        console.log({ result });
        if (result?.errors) {
            return res.status(500).json({
                message: "Error.",
                data: JSON.stringify(result.errors),
            });
        }
        return res.status(200).json({
            message: "Data successfully received from database.",
            data: result?.data || result,
        });

        //======================================
    } catch (error) {
        console.error(error);
    }
};

export default myVideo;
