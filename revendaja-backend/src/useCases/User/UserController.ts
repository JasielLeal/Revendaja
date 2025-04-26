import { AppError } from "@/lib/AppError";
import { Request, Response } from "express";
import { CreateUserDTO } from "./CreateUser/CreateUserDTO";
import { PrismaUserRepository } from "@/repositories/user/PrismaUserRepository";
import { CreateUserUseCase } from "./CreateUser/CreateUserUseCase";
import { VerifyEmailUseCase } from "./VerifyEmail/VerifyEmailUseCase";
import { AuthenticateDTO } from "./Authenticate/AuthenticateDTO";
import { AuthenticateUseCase } from "./Authenticate/AuthenticateUseCase";
import { DisableAccountUseCase } from "./DisableAccount/DisableAccountUseCase";
import { ForgetPasswordUseCase } from "./ForgetPassword/ForgetPasswordUseCase";
import { UpdatePasswordUseCase } from "./UpdatePassword/UpdatePassswordUseCase";
import { UpdatedExpoTokenUseCase } from "./updatedExpoToken/updatedExpoTokenUseCase";
import { UpdatePlanUseCase } from "./UpdatePlan/UpdatePlanUseCase";
import { GetPlanUseCase } from "./GetPlan/GetPlanUseCase";

export class UserController {
  async CreateUser(request: Request, response: Response): Promise<any> {
    try {
      const { email, name, password, role, secondName }: CreateUserDTO = request.body;

      

      const prismaUserRepository = new PrismaUserRepository();
      const createUserUseCase = new CreateUserUseCase(prismaUserRepository);

      const user = await createUserUseCase.execute({
        email,
        name,
        password,
        role,
        secondName,
      });

      return response.status(200).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async VerifyEmail(request: Request, response: Response): Promise<any> {
    try {
      const { code, email } = request.body;
      const prismaUserRepository = new PrismaUserRepository();
      const verifyEmailUseCase = new VerifyEmailUseCase(prismaUserRepository);

      const user = await verifyEmailUseCase.execute(code, email);

      return response.status(200).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async Authenticate(request: Request, response: Response): Promise<any> {
    try {
      const { email, password }: AuthenticateDTO = request.body;
      console.log(email, password)  
      const prismaUserRepository = new PrismaUserRepository();
      const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

      const user = await authenticateUseCase.execute({ email, password });

      return response.status(200).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async DisableAccount(request: Request, response: Response): Promise<any> {
    try {
      const { email } = request.user;

      const prismaUserRepository = new PrismaUserRepository();
      const disableAccountUseCase = new DisableAccountUseCase(
        prismaUserRepository
      );

      await disableAccountUseCase.execute(email);

      return response.status(200).send();
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async ForgetPassword(request: Request, response: Response): Promise<any> {
    try {
      const { email } = request.body;

      const prismaUserRepository = new PrismaUserRepository();
      const forgetPasswordUseCase = new ForgetPasswordUseCase(
        prismaUserRepository
      );

      await forgetPasswordUseCase.execute({ email });

      return response.status(200).send();
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async UpdatePassword(request: Request, response: Response): Promise<any> {
    try {
      const { email, newPassword } = request.body;

      const prismaUserRepository = new PrismaUserRepository();
      const updatePasswordUseCase = new UpdatePasswordUseCase(
        prismaUserRepository
      );

      await updatePasswordUseCase.execute({
        email,
        newPassword,
      });

      return response.status(200).send();
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async UpdatedExpoToken(request: Request, response: Response): Promise<any> {
    try {
      const { token } = request.body;

      const { id } = request.user;

      const prismaUserRepository = new PrismaUserRepository();

      const updatedExpoTokenUseCase = new UpdatedExpoTokenUseCase(
        prismaUserRepository
      );

      const updatedToken = await updatedExpoTokenUseCase.execute(token, id);

      return response.status(200).send(updatedToken);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async UpdatePlan(request: Request, response: Response): Promise<any> {
    try {
      const userId = request.user.id;
      const { plan } = request.body;

      const prismaUserRepository = new PrismaUserRepository();
      const updatePlanUseCase = new UpdatePlanUseCase(prismaUserRepository);

      const planRefresh = await updatePlanUseCase.execute(userId, plan);

      return response.status(200).send(planRefresh);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async GetPlan(request: Request, response: Response): Promise<any> {
    try {
      const userId = request.user.id;
      const prismaUserRepository = new PrismaUserRepository();
      const getPlanUseCase = new GetPlanUseCase(prismaUserRepository);

      const plan = await getPlanUseCase.execute(userId);

      return response.status(200).send(plan);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }
}
