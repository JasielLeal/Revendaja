import { BankSlip } from "@/entities/BankSlip";
import { BankSlipRepository } from "./BankSlipRepository";
import { prisma } from "@/lib/prisma";

export class PrismaBankSlipRepository implements BankSlipRepository {
  async create(data: BankSlip): Promise<BankSlip | null> {
    const bankSlip = await prisma.bankSlip.create({
      data: {
        barcode: data.barcode,
        companyName: data.companyName,
        dueDate: data.dueDate,
        storeId: data.storeId,
        value: data.value,
      },
    });

    return bankSlip;
  }

  async listAllByStore(
    storeId: string,
    page: 1,
    pageSize: 10,
    companyName: string
  ): Promise<{
    currentPage: number;
    totalPages: number;
    bankSlips: BankSlip[];
  }> {
    const totalBankSlip = await prisma.bankSlip.count({
      where: {
        storeId,
      },
    });

    const totalPages = Math.ceil(totalBankSlip / 10);

    const bankSlips = await prisma.bankSlip.findMany({
      where: {
        storeId,
        companyName,
      },
      skip: (page - 1) * pageSize || 0,
      take: Number(pageSize) || 10,
    });

    return {
      currentPage: Number(page),
      totalPages: totalPages,
      bankSlips,
    };
  }

  async findByBarcode(barcode: string): Promise<BankSlip | null> {
    const bankslip = await prisma.bankSlip.findUnique({
      where: {
        barcode,
      },
    });

    return bankslip;
  }

  async deleteById(id: string, storeId: string): Promise<BankSlip | null> {
    const bankSlip = await prisma.bankSlip.delete({
      where: {
        id,
        storeId,
      },
    });

    if (!bankSlip) {
      // Se o boleto não pertence à loja ou não existe, retorne null ou lance o erro
      return null;
    }

    return bankSlip;
  }

  async findById(id: string): Promise<BankSlip | null> {
    const bankSlip = await prisma.bankSlip.findUnique({
      where: {
        id,
      },
    });

    return bankSlip;
  }

  async checkValidity(storeId: string) {
    const bankSlip = await prisma.bankSlip.findMany({
      where: {
        storeId,
      },
    });

    if (bankSlip.length === 0) {
      return `Nenhum boleto encontrado para a loja com ID ${storeId}.`;
    }

    const today = new Date();
    const ticketCloseToExpiration = bankSlip.filter((boleto) => {
      const vencimento = new Date(boleto.dueDate);

      const diasRestantes = Math.floor(
        (vencimento.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return diasRestantes === 3 || diasRestantes === 1 || diasRestantes < 0;
    });

    const ticketLenght = bankSlip.length;

    return {
      ticketCloseToExpiration,
      ticketLenght,
    };
  }
}
