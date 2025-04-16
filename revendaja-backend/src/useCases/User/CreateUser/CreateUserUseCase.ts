import { UserRepository } from "@/repositories/user/UserRepository";
import { CreateUserDTO } from "./CreateUserDTO";
import { AppError } from "@/lib/AppError";
import nodemailer from "nodemailer";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";
import Stripe from "stripe";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, secondName, password, role }: CreateUserDTO) {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError("Usuário já cadastrado.", 400);
    }

    const passwordHash = await hash(password, 6);

    // Gerar o código de verificação
    const verificationCode = randomBytes(3).toString("hex").toUpperCase();

    const customerId = await this.createStripeCustomer(name, email);

    const newUser = await this.userRepository.create({
      email,
      name,
      secondName,
      password: passwordHash,
      role,
      verificationCode, 
      stripeCustomerId: customerId,
    });

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
        to: newUser.email,
        from: process.env.EMAIL_USER,
        subject: "Olá, seja bem-vindo ao Revendaja.",
        html: `
          <html>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
            <table align="center" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
              <tr>
                <td style="color: #333333; padding: 20px; text-align: left;">
                  <img src="https://revendaja.s3.us-east-2.amazonaws.com/Logo+-+Completa.png" alt="Logo Revendaja." style="max-width: 150px; height: auto;" />
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <p style="font-size: 16px; line-height: 1.5; color: #333333; font-weight: 600">
                    Olá ${newUser.name} ${newUser.secondName},
                  </p>
                  <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                    Estamos muito felizes em tê-lo conosco! Sua conta foi criada com sucesso, e você agora pode explorar todas as funcionalidades do nosso aplicativo.
                  </p>
                  <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                    Para ativar sua conta, insira o código abaixo no aplicativo:
                  </p>
                  <p style="font-size: 24px; font-weight: bold; text-align: center; color: #ff700d;">
                    ${verificationCode}
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

      return verificationCode;
    } catch (err) {
      console.error("Erro ao enviar o e-mail:", err);

      if (err.response) {
        console.error("Resposta do servidor:", err.response);
      }

      throw new AppError("Erro ao enviar o e-mail de cadastro", 400);
    }
  }

  async createStripeCustomer(customerName: string, customerEmail: string) {
    const stripe = new Stripe(process.env.STRIPE_SK);

    const customer = await stripe.customers.create({
      name: customerName,
      email: customerEmail,
    });

    return customer.id;
  }
}
