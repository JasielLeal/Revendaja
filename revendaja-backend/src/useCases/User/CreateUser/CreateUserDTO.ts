export interface CreateUserDTO {
  id?: string;
  name: string;
  secondName: string;
  verificationCode?: string;
  email: string;
  password?: string;
  role?: string;
  image?: string;
}
