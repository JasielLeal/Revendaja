# Revendaja
Sistema completo de gestão desenvolvido para atender as necessidades de perfumarias. A aplicação oferece funcionalidades como:

- Controle de estoque

- Catálogo de produtos

- Sistema financeiro

- Gestão de assinaturas de clientes

O sistema é composto por três frentes principais:

- Frontend Web: Desenvolvido com NextJS

- Aplicativo Mobile: Desenvolvido com React Native

- Backend: Desenvolvido com NodeJS, utilizando PrismaORM para gerenciamento do banco de dados

O objetivo deste projeto é centralizar a administração das operações de uma perfumaria em uma única plataforma, tornando a gestão mais prática, organizada e eficiente.



## 🧭 Inicialização

### - Backend (`revendaja-backend`)
```bash
# Acesse a pasta
cd revendaja-backend

# Crie o arquivo .env com base no exemplo
cp .env.example .env

# Instale as dependências
npm install

# Suba os containers Docker
docker compose up -d

# Rode as migrações do Prisma
npx prisma migrate dev

# Inicie a aplicação
npm run dev
```

### - Front End (Web)
```bash

# Entre na pasta backend
cd revendaja-frontend

# Crie o arquivo .env contendo as variáveis de ambiente
cp .env.example

# Instale as dependências
npm install

# Rode a aplicação
npm run dev
```

### - Front End (Mobile)
```bash

# Entre na pasta backend
cd revendaja

# Crie o arquivo .env contendo as variáveis de ambiente
cp .env.example

# Instale as dependências
npm install

# Rode a aplicação
npx expo start 
```

## 🏗️ Infraestrutura

### 📦 Docker
```bash
- O projeto utiliza Docker e Docker Compose para orquestrar os serviços de desenvolvimento local,
como o banco de dados PostgreSQL.

- O arquivo docker-compose.yml está localizado na raiz da pasta revendaja-backend.
```

### 🛢️ Banco de Dados
```bash
- Banco de dados utilizado: PostgreSQL.

- Gerenciado via PrismaORM, que controla as migrações e o acesso às tabelas.
```

### ☁️ Armazenamento de Imagens (AWS S3)
```bash
- Imagens de produtos são enviadas e armazenadas na AWS S3.

- As imagens são acessadas via URL pública e vinculadas ao cadastro do produto.

- As credenciais de acesso estão configuradas por variáveis de ambiente no arquivo .env do backend.
```

### 💳 Integração com Stripe
```bash
Utilizamos a Stripe como plataforma de pagamentos para gerenciar assinaturas dos clientes.

Os assinantes podem realizar pagamentos recorrentes (mensalmente) através de planos cadastrados na Stripe.

Cada cliente tem um customerId salvo no banco de dados, vinculado à sua conta Stripe.

O backend se comunica com a API da Stripe para:

- Criar clientes.

- Criar e gerenciar assinaturas.

- Verificar status de pagamento.

- Cancelar planos ou atualizar métodos de pagamento.

Webhooks da Stripe são utilizados para atualizar o status da assinatura em tempo real
no sistema (ex: pagamento aprovado, falha, cancelamento).

Variáveis de ambiente utilizadas localiza no backend.
```
