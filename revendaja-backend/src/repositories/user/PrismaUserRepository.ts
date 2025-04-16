import { User } from "@/entities/User";
import { UserRepository } from "./UserRepository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UserRepository {
  async create(data: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        secondName: data.secondName,
        password: data.password,
        role: data.role,
        verificationCode: data.verificationCode,
        stripeCustomerId: data.stripeCustomerId,
      },
    });

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async updateEmailVerified(email: string, emailVerified: Date) {
    const user = await prisma.user.update({
      where: {
        email, // Identificando o usuário pelo e-mail
      },
      data: {
        emailVerified,
        verificationCode: null, // Atualizando o campo emailVerified
      },
    });

    return user; // Retorna o usuário atualizado
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async userHasStore(userId: string): Promise<boolean> {
    const userWithStores = await prisma.user.findUnique({
      where: { id: userId },
      include: { stores: true }, // Incluir as lojas relacionadas ao usuário
    });

    // Verifica se a lista de lojas não está vazia
    return userWithStores?.stores.length > 0;
  }

  async updateStatus(status: string, email: string): Promise<User | null> {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        status,
      },
    });

    return user;
  }

  async updateVerificationCode(verificationCode: string, email: string) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        verificationCode,
      },
    });

    return;
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: newPassword,
      },
    });

    return;
  }

  async updatePlan(userId: string, plan: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        plan: plan,
      },
    });

    return;
  }

  async updateExpoToken(token: string, userId: string) {
    const userExpoToken = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        expoToken: token,
      },
    });

    return userExpoToken;
  }

  async getPlan(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        plan: true,
      },
    });

    return user
  }
}
