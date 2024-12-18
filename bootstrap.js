import express from 'express'
import router from './src/routes/routes.js'
import "dotenv/config"
import { MongoClient } from 'mongodb'
import { get_env_variable, pm_log } from './src/utils/server.js'
import { init_user_model } from './src/model/user.js'

const init_app = async () => {
    app.express = express()
    app.express.use(express.json());
    app.express.use(router)
}

const init_mongo = async () => {

    const client = new MongoClient(get_env_variable("MONGO_DB_URI")); 

    try {
        
        app.database = client.db(get_env_variable("MONGO_DB_NAME"));

        const user_collection = await init_user_model()
        user_collection.createIndex(
          { email: 1 },
          {
            partialFilterExpression: { is_deleted: false },
            unique: true,
          }
        )

        pm_log("Database connection succed")

    } catch (error) {
        pm_log(error)
        throw new Error(error)
    }
}

const app = {
    "init": async () => {
        await init_mongo()
        await init_app()
    }
}

export default app

export { 
    get_env_variable,
    pm_log 
}