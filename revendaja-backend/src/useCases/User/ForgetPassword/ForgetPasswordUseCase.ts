import { AppError } from "@/lib/AppError";
import { UserRepository } from "@/repositories/user/UserRepository";
import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import { ForgetPasswordDTO } from "./ForgetPasswordDTO";

export class ForgetPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email }: ForgetPasswordDTO) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (user.status == "Check") {
      throw new AppError("Verifique seu email", 401);
    }

    if (user.status == "Disabled") {
      throw new AppError("Credenciais inválidas", 401);
    }

    const verificationCode = randomBytes(3).toString("hex").toUpperCase();

    await this.userRepository.updateVerificationCode(verificationCode, email);

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
        to: email,
        from: process.env.EMAIL_USER,
        subject: "Código de redefinição de senha",
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
                        Recebemos uma solicitação para redefinir a senha da sua conta. Para continuar, insira o código abaixo no aplicativo:
                      </p>
                      <p style="font-size: 24px; font-weight: bold; text-align: center; color: #ff700d;">
                        ${verificationCode}
                      </p>
                      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                        Se você não solicitou essa alteração, pode ignorar esta mensagem. Sua senha permanecerá a mesma.
                      </p>
                      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                        Caso tenha dúvidas ou precise de assistência, nossa equipe de suporte está à disposição para ajudá-lo.
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
      throw new AppError("Error ao enviar o codigo, tente novamente", 404);
    }
  }
}
