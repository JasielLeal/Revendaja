import { AppError } from "@/lib/AppError";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class ActiveStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(userId: string) {

    const store = await this.storeRepository.findStoreByUserId(userId)

    if (!store) {
      throw new AppError("Loja não encontrada", 404);
    }

    await this.storeRepository.activeStore(store.id);
    await this.createSubdomain(store.subdomain)
  }

  async createSubdomain(subdomain: string) {
    try {
      const response = await fetch(
        `https://api.vercel.com/v10/projects/${process.env.NEXT_PROJECTID}/domains`,
        {
          method: "POST",  // Método HTTP correto
          headers: {
            Authorization: "Bearer " + process.env.NEXT_TOKEN,
            "Content-Type": "application/json",  // Definir o tipo de conteúdo
          },
          body: JSON.stringify({  // Converter o body para JSON
            name: `${subdomain}.revendaja.com`,
          }),
        }
      );
  
      const data = await response.json();
  
      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro ao criar subdomínio: ${data.error.message}`);
      }
      return data;
    } catch (error) {
      console.error("Erro ao criar subdomínio:", error.message);
      throw error;
    }
  }
}
