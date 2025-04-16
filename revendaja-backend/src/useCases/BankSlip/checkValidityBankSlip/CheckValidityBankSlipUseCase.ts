import { AppError } from "@/lib/AppError";
import { BankSlipRepository } from "@/repositories/bankSlip/BankSlipRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import axios from "axios";

export class CheckValidityBankSlipUseCase {
  constructor(
    private bankSlipRepository: BankSlipRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(userId: string, expoToken: string) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const bankSlips = await this.bankSlipRepository.checkValidity(store.id);

    if (bankSlips.ticketCloseToExpiration) {
      if (Number(bankSlips.ticketLenght) <= 1) {
        await sendPushNotification(
          String(expoToken),
          `Você tem ${bankSlips.ticketLenght} boleto vencendo`
        );

        return bankSlips;
      }

      await sendPushNotification(
        String(expoToken),
        `Você tem ${bankSlips.ticketLenght} boletos vencendo`
      );
    }

    return bankSlips;
  }
}

const sendPushNotification = async (expoPushToken: string, message: string) => {
  const body = {
    to: expoPushToken,
    sound: "default",
    title: "Boleto Vencendo!",
    body: message,
    data: { someData: "additional data" },
  };

  try {
    await axios.post("https://exp.host/--/api/v2/push/send", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
  }
};
