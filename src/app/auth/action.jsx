"use server";

import validateRegister from "@/validators/validate-resgiter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateLogin from "@/validators/validate-login";

export const registerUser = async (prev, formData) => {
  try {
    const rawData = Object.fromEntries(formData);

    const errors = validateRegister(rawData);
    if (errors) {
      return { code: 1, errors };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: rawData.email },
    });

    if (existingUser) {
      return { code: 1, errors: { email: "Email already exists" } };
    }

    const hashedPassword = await bcrypt.hash(rawData.password, 12);

    const { confirmPassword, ...userData } = rawData;

    await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return { code: 0, message: "Register success. Please log in to continue." };
  } catch (error) {
    console.error("registerUser error:", error);
    return { code: 1, message: "Something went wrong" };
  }
};

export const loginUser = async (prev, formData) => {
  try {
    const { email, password } = Object.fromEntries(formData);

    const errors = validateLogin({ email, password });
    if (errors) {
      return { code: 400, errors };
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { code: 400, errors: { email: "Email not found" } };
    }

    if (user.type !== "ADMIN") {
      return {
        code: 400,
        errors: { email: "You do not have permission to login" },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { code: 400, errors: { password: "Password not match" } };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, type: user.type },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    return { code: 0, message: "Login success", token: token };
  } catch (error) {
    console.error("loginUser error:", error);
    return { code: 1, message: "Something went wrong" };
  }
};
