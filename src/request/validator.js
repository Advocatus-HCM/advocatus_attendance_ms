import { checkSchema, validationResult } from "express-validator";

const validate = (schema) => {
  return [
    // Middleware to sanitize the request body
    (req, res, next) => {
      req.body = sanitizeRequestBody(schema, req.body);
      next();
    },

    // Middleware to validate the schema
    checkSchema(schema),

    // Middleware to handle validation errors
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      next();
    },
  ];
};

const sanitizeRequestBody = (schema, body) => {
  const allowedKeys = Object.keys(schema);
  return Object.keys(body)
    .filter((key) => allowedKeys.includes(key))
    .reduce((acc, key) => {
      acc[key] = body[key];
      return acc;
    }, {});
};

export default validate;
