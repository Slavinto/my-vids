import { validateJwtToken } from "../../../lib/jwt";

const myVideo = async (req, res) => {
    if (req.method !== "POST")
        return res
            .status(400)
            .json({ message: "Error! Invalid request method." });

    try {
        const token = req.cookies["hasura-token"]?.split("Bearer ")[1];
        const session = JSON.parse(req.body);
        if (!token || !session)
            return res
                .status(401)
                .json({ message: "Error! Something went wrong during login." });

        const data = validateJwtToken(token);
        if (!data)
            return res.status(403).json({ message: "Error! Invalid token." });
        console.log({ data });
        // console.log({ session });
        return res.status(200).json({
            message: "success",
        });
    } catch (error) {}
};

export default myVideo;
