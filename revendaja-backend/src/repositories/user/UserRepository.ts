import { User } from "@/entities/User";

export interface UserRepository {
  create(data: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  updateEmailVerified(email: string, emailVerified: Date): Promise<User | null>;
  userHasStore(userId: string): Promise<boolean>;
  updateStatus(status: string, email: string): Promise<User | null>;
  updateVerificationCode(verificationCode: string, email: string);
  updatePassword(email: string, newPassword: string): Promise<void>;
  updatePlan(userId: string, plan: string): Promise<void>;
  updateExpoToken(token: string, userId: string);
  getPlan(userId: string);
}
