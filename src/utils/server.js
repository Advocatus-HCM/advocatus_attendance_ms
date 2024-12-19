const get_env_variable = (variable_name) => {
  return process.env[variable_name];
};

const pm_log = async (item, error = null) => {
  return error ? console.error(item) : console.log(item);
};

export { 
    pm_log, 
    get_env_variable
}