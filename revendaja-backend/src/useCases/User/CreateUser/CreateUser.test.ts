import { expect, it, jest, describe, beforeEach } from "@jest/globals";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { PrismaUserRepository } from "@/repositories/user/PrismaUserRepository";

jest.mock("@/repositories/user/PrismaUserRepository");

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryMock: jest.Mocked<PrismaUserRepository>;

  beforeEach(() => {
    userRepositoryMock =
      new PrismaUserRepository() as jest.Mocked<PrismaUserRepository>;
    createUserUseCase = new CreateUserUseCase(userRepositoryMock);
  });

  it("should be able to create a new user", async () => {
    userRepositoryMock.findByEmail.mockResolvedValue(null);

    

    userRepositoryMock.create.mockResolvedValue({
      id: "123",
      email: "teste@email.com",
      name: "Teste",
      secondName: "User",
      password: "hashedpassword",
      role: "user",
      verificationCode: "123456",
      stripeCustomerId: "stripe_123",
    });

    const result = await createUserUseCase.execute({
      email: "teste@email.com",
      name: "Teste",
      secondName: "User",
      password: "senha123",
      role: "user",
    });

    expect(result).toBeDefined();
    expect(userRepositoryMock.create).toHaveBeenCalled();
  });
});
