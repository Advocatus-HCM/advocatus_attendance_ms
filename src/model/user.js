import app, { pm_log } from "../../bootstrap.js"
import PM_COLLECTIONS from "../constant/database.js"

const init_user_model = async () => {
    try {
        const user_model = await app.database.collection(PM_COLLECTIONS.USER)
        return user_model
    } catch (error) {
        pm_log('User Model Error: ' + error, true)
    }

}

export {
    init_user_model
}