import app, { pm_log } from "../../bootstrap.js";
import PM_COLLECTIONS from "../constant/database.js";

const init_team_model = async () => {
  try {
    const team_model = await app.database.collection(PM_COLLECTIONS.TEAM);
    return team_model;
  } catch (error) {
    pm_log("Team Model Error: " + error, true);
  }
};

export { init_team_model };
