import { Store } from "@/entities/Store";
import { StoreRepository } from "./StoreRepository";
import { prisma } from "@/lib/prisma";

export class PrismaStoreRepository implements StoreRepository {
  async create(
    name: string,
    description: string,
    userId: string,
    subdomain: string,
    numberPhone: string
  ): Promise<Store> {
    const storeData = await prisma.store.create({
      data: {
        name,
        userId,
        description,
        subdomain,
        numberPhone,
      },
    });

    return storeData;
  }

  async findByName(name: string): Promise<Store | null> {
    const store = await prisma.store.findUnique({
      where: {
        name,
      },
    });

    return store;
  }

  async findById(id: string): Promise<Store | null> {
    const store = await prisma.store.findUnique({
      where: {
        id,
      },
    });

    return store;
  }

  async findStoreByUserId(userId: string) {
    const store = await prisma.store.findFirst({
      where: { userId: userId },
    });

    return store;
  }

  async findBySubdomain(subdomain: string): Promise<Store | null> {
    const subdomainExist = await prisma.store.findUnique({
      where: {
        subdomain,
      },
    });

    return subdomainExist;
  }

  async activeStore(storeId: string) {
    const store = await prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        status: "active",
      },
    });

    return store;
  }

  async countStoresByUserId(userId: string) {
    const count = await prisma.store.count({
      where: {
        userId,
      },
    });
    return count;
  }
}
