import app, { pm_log } from "../../bootstrap.js";
import PM_COLLECTIONS from "../constant/database.js";

const init_contract_model = async () => {
  try {
    const contract_model = await app.database.collection(PM_COLLECTIONS.CONTRACT);
    return contract_model;
  } catch (error) {
    pm_log("Contract Model Error: " + error, true);
  }
};

export { init_contract_model };
