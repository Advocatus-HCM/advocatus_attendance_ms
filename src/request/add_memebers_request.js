export const add_memebers_request = {
  team_name: {
    isString: true,
    notEmpty: true,
  },
  members: {
    isArray: true,
    notEmpty: true,
  },
  "members.*": {
    isEmail: true,
    notEmpty: true,
  },
};
