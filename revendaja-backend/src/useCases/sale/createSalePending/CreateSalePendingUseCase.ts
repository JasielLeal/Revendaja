import { AppError } from "@/lib/AppError";
import admin from "@/lib/firebase";
import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { UserRepository } from "@/repositories/user/UserRepository";
import { io } from "@/server";
import axios from "axios";

export class CreateSalePendingUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private storeRepository: StoreRepository,
    private stockRepository: StockRepository,
    private userRepostirory: UserRepository
  ) {}

  async execute(
    subdomain: string,
    items: any[],
    customer: string,
    transactionType: string,
    numberPhone: string
  ) {
    const store = await this.storeRepository.findBySubdomain(subdomain);

    if (!store) {
      throw new AppError("Loja não encontrada", 404);
    }

    let totalPrice = 0;
    const saleItemsData = [];

    for (const item of items) {
      const stockItem = await this.stockRepository.findStockById(
        item.id,
        store.id
      );

      if (!stockItem) {
        throw new AppError(
          `Produto com código ${item.id} não encontrado ou não disponível no estoque da loja ${store.id}`
        );
      }

      if (stockItem.quantity < item.quantity) {
        throw new AppError(
          `Quantidade insuficiente no estoque para o produto com código ${item.barcode}`
        );
      }

      const price = stockItem.customPrice || stockItem.normalPrice || "0";
      const itemTotalPrice = parseFloat(price) * item.quantity;
      totalPrice += itemTotalPrice;

      saleItemsData.push({
        stockId: stockItem.id,
        quantity: item.quantity,
        price,
      });
    }

    const sale = await this.saleRepository.createSaleWithItems(
      saleItemsData,
      totalPrice,
      store.id,
      customer,
      "Pending",
      transactionType,
      numberPhone
    );

    io.to(store.userId).emit("new-sale", {
      type: "pending",
      payload: sale,
    });

    const user = await this.userRepostirory.findById(store.userId); // Você já tem o pushToken armazenado

    const expoPushToken = user?.expoToken;

    if (expoPushToken) {
      await sendPushNotification(
        String(expoPushToken),
        `Uma nova venda foi concluída com sucesso em seu site. Acesse o painel para ver todos os detalhes da transação.`
      );

      await sendFireBaseNotification(
        String(expoPushToken),
        sale.id,
        totalPrice
      );
    }

    io.to(store.userId).emit("atualizarVendas", {
      venda: "Nova venda registrada para você!",
    });

    return sale;
  }
}

const sendPushNotification = async (expoPushToken: string, message: string) => {
  console.log("[FCM] Enviando notificação:", message);

  const body = {
    to: expoPushToken,
    sound: "default",
    title: "Nova venda realizada",
    body: message,
    data: { someData: "additional data" },
    experienceId: "@szreactioon/revendaja",
  };

  try {
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("[EXPO] Enviando notificação para:", expoPushToken);
    console.log(
      "[EXPO] Resposta da API:",
      JSON.stringify(response.data, null, 2)
    );
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
  }
};

const sendFireBaseNotification = async (
  expoPushToken: string,
  saleId: string,
  amount: number
) => {
  const message = {
    notification: {
      title: "Nova venda realizada",
      body: `Venda #${saleId} no valor de R$ ${amount.toFixed(
        2
      )} foi registrada`,
    },
    data: {
      saleId,
      type: "new-sale",
      redirectTo: `/sales/${saleId}`,
    },
    token: expoPushToken,
  };

  console.log("[FCM] Enviando notificação:", message);
  console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
  console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
  console.log(
    "FIREBASE_PRIVATE_KEY exists:",process.env.FIREBASE_PRIVATE_KEY
  );

  try {
    const response = await admin.messaging().send(message);
    console.log("[FCM] Notificação enviada com sucesso:", response);
    return response;
  } catch (error: any) {
    console.error("[FCM] Erro ao enviar notificação:", error);

    if (
      error.code === "messaging/invalid-registration-token" ||
      error.code === "messaging/registration-token-not-registered"
    ) {
      console.log("[FCM] Token inválido, removendo do usuário...");
      // Lógica para remover token inválido aqui
    }

    throw error;
  }
};
