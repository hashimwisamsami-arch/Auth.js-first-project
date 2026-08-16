"use server";
import { prisma } from "./../utils/prisma";
import { LoginShema, RegisterShema } from "@/utils/validationSchemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

type LoginDto = z.infer<typeof LoginShema>;
type RegisterDto = z.infer<typeof RegisterShema>;

//login action
export const loginAction = async (data: LoginDto) => {
  const validation = LoginShema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid credentials" };
  }
  console.log(data);
  return { success: "Logged is successfully" };
};

//register action
export const registerAction = async (data: RegisterDto) => {
  const validation = RegisterShema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials" };
  }
  const { name, password, email } = validation.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return { success: false, message: "User already exist" };
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });
  return { success: true, message: "user created is successfully" };
};
