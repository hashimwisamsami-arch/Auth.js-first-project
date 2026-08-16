"use server";
import { prisma } from "./../utils/prisma";
import { LoginShema, RegisterShema } from "@/utils/validationSchemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

type LoginDto = z.infer<typeof LoginShema>;
type RegisterDto = z.infer<typeof RegisterShema>;

//login action
export const loginAction = async (data: LoginDto) => {
  const validation = LoginShema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials" };
  }
  const { email, password } = validation.data;
  try {
    await signIn("credentials", { email, password, redirectTo: "/profile" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }
    throw error;
  }
  return { success: true, message: "Logged is successfully" };
};

//register action
export const registerAction = async (data: RegisterDto) => {
  const validation = RegisterShema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials" };
  }
  const { name, password, email } = validation.data;
  try {
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
  } catch {
    return { success: false, message: "Something went wrong" };
  }
};

export const logoutAction = async () => {
  await signOut();
};
