import { pm_log } from "../utils/server.js"
import * as user_service from "../service/user.js";

export const create_user = async (req, res) => {
    try {

        user_service.create_user(req.body)

        return res.status(200).send("User inserted succesfully")

    } catch (error) {
        pm_log(error, true)
        return res.status(500).json(error)
    }
}