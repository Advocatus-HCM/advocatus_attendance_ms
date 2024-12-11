import { init_user_model } from "../model/user.js"
import { pm_log } from "../utils/server.js"

let user_model = null

export const create_user = async (user) => {
    try {
        user_model = await init_user_model()
        await user_model.insertOne(user)

    } catch (error) {
        pm_log('User Service: ' + error, true)
    }
}
