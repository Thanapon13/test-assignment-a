import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be no more than 255 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "string.max": "Email must be no more than 255 characters",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(255)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must be no more than 255 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "any.required": "Password is required",
    }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Please confirm your password",
    "any.only": "Passwords do not match",
    "any.required": "Please confirm your password",
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
  }

  return null;
};

export default validateRegister;
