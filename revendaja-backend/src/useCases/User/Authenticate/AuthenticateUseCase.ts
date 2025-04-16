import { AuthenticateDTO } from "./AuthenticateDTO";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "@/lib/AppError";
import { UserRepository } from "@/repositories/user/UserRepository";
import nodemailer from "nodemailer";

interface AuthenticateResponse {
  token: string;
  user: {
    id: string;
    name: string;
    secondName: string;
    email: string;
    image: string;
    plan: string;
    role: string;
    userHasStore: boolean;
    status: string;
    expoToken: string;
  };
  // adicione outros campos necessários
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateDTO): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new AppError("Credenciais inválidas", 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT Secret não configurado!");
    }

    if (user.status == "Check") {
      const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com", // Servidor SMTP da Hostinger
        port: 465, // Use 465 para SSL ou 587 para TLS
        secure: true, // true para 465 (SSL), false para 587 (TLS)
        auth: {
          user: process.env.EMAIL_USER, // Seu e-mail personalizado
          pass: process.env.EMAIL_PASS, // Senha do e-mail
        },
      });

      try {
        const mailOptions = {
          to: user.email,
          from: process.env.EMAIL_USER,
          subject: "Olá, seja bem-vindo ao Revendaja.",
          html: `
            <html>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
              <table align="center" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="color: #333333; padding: 20px; text-align: left;">
                    <img src="https://i.imgur.com/mcon2oX.png" alt="Logo Revendaja" style="max-width: 150px; height: auto;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <p style="font-size: 16px; line-height: 1.5; color: #333333; font-weight: 600">
                      Olá ${user.name} ${user.secondName},
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                      Estamos muito felizes em tê-lo conosco! Sua conta foi criada com sucesso, e você agora pode explorar todas as funcionalidades do nosso aplicativo.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                      Para ativar sua conta, insira o código abaixo no aplicativo:
                    </p>
                    <p style="font-size: 24px; font-weight: bold; text-align: center; color: #ff700d;">
                      ${user.verificationCode}
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                      Se você tiver alguma dúvida ou precisar de assistência, nossa equipe de suporte está pronta para ajudar.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                      Aproveite sua experiência no Revendaja!
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                      Atenciosamente,<br>Equipe Revendaja.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f5f5f5; padding: 10px; text-align: center;">
                    <p style="font-size: 12px; color: #999999; margin: 0;">
                      &copy; ${new Date().getFullYear()} Revendaja. Todos os direitos reservados.
                    </p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error("Erro ao enviar o e-mail:", err);

        if (err.response) {
          console.error("Resposta do servidor:", err.response);
        }

        throw new AppError("Erro ao enviar o e-mail de cadastro", 400);
      }

      throw new AppError(
        "Conta não verificada. Por favor, verifique seu e-mail.",
        403
      );
    }

    if (user.status == "Disabled") {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    const userHasStore = await this.userRepository.userHasStore(user.id);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        secondName: user.secondName,
        email: user.email,
        image: user.image,
        plan: user.plan,
        role: user.role,
        userHasStore,
        status: user.status,
        expoToken: user.expoToken,
      },
      // inclua outros campos não sensíveis conforme necessário
    };
  }
}
