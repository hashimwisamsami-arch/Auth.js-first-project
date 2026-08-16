import type { NextAuthConfig } from "next-auth";
import { prisma } from "./utils/prisma";
import bcrypt from "bcryptjs";
import { LoginShema } from "./utils/validationSchemas";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      async authorize(data) {
        const validation = LoginShema.safeParse(data);
        if (validation.success) {
          const { email, password } = validation.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !user.password) return null;
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
