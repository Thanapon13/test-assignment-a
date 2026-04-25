// src/utils/validate-comment.js
import Joi from "joi";

const commentSchema = Joi.object({
  sender_name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "กรุณากรอกชื่อผู้ส่ง",
    "string.min": "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร",
    "string.max": "ชื่อต้องไม่เกิน 100 ตัวอักษร",
    "any.required": "กรุณากรอกชื่อผู้ส่ง",
  }),

  message: Joi.string()
    .trim()
    .min(1)
    .max(500)
    .pattern(/^[ก-๙0-9\s]+$/)
    .required()
    .messages({
      "string.empty": "กรุณากรอกข้อความ",
      "string.min": "ข้อความต้องมีอย่างน้อย 1 ตัวอักษร",
      "string.max": "ข้อความต้องไม่เกิน 500 ตัวอักษร",
      "string.pattern.base": "ข้อความต้องเป็นภาษาไทยและตัวเลขเท่านั้น",
      "any.required": "กรุณากรอกข้อความ",
    }),
});

const validateComment = input => {
  const { error } = commentSchema.validate(input, {
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

export default validateComment;
