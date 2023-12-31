import { getDbUser, insertDbUser } from "../../../lib/db/hasura";
import { signJwtToken } from "../../../lib/jwt";

const login = async (req, res) => {
    if (req.method !== "POST")
        return res
            .status(400)
            .json({ message: "Error - invalid request method!" });
    try {
        //==============================================
        // getting login(email) from request headers

        // const { login, name } = req?.headers;
        if (!login) {
            // exit if no email login provided
            return res.status(400).json({ message: "Error - invalid login!" });
        }

        // generate jwt token for particular email login
        const token = "Bearer " + signJwtToken(login);

        // requesting gql db for a user data
        const { data, error } = await getDbUser(login, token);

        if (!data || error) {
            return res.status(500).json({
                message: "Error getting user from DB!",
                token: { token },
            });
        }

        const { users } = data;

        // if no user - create one
        if (users?.length === 0 && !error) {
            const user = {
                login,
                name,
            };
            const { data, error } = await insertDbUser(user, token);
            if (!error) {
                return res
                    .status(200)
                    .json({ inserted_user: data.insert_users_one });
            }
        }

        return res.status(200).json({
            token,
            users_found: { ...data },
        });
        //==============================================
    } catch (error) {
        console.error(`Something went wrong: ${error.message}`);
        return res.status(500).json({ message: "Error logging in!" });
    }
};

export default login;
