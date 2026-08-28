# 🌿 Plant AI - Frontend Web App

Interface web moderna e responsiva desenvolvida em **React** e **Vite** para o ecossistema **Plant AI**. A aplicação permite que usuários gerenciem suas plantas, monitorem rotinas de rega e adubação, identifiquem espécies usando a câmera com Inteligência Artificial e recebam diagnósticos botânicos personalizados.

---

## 🛠️ Pré-requisitos e Ferramentas Necessárias

Antes de baixar e executar este projeto localmente, certifique-se de ter as seguintes ferramentas instaladas e configuradas em seu ambiente:

### 1. Ambiente de Execução & Gerenciador de Pacotes
* **[Node.js](https://nodejs.org/)** (Versão `18.x` ou superior — LTS recomendada)
* **[NPM](https://www.npmjs.com/)** (Geralmente instalado junto com o Node.js) ou outro gerenciador de sua preferência (*Yarn*, *PNPM*)
* **[Git](https://git-scm.com/)** (Para clonar o repositório e controle de versão)

### 2. Dispositivo / Navegador Web
* **Navegador Web Moderno** (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.)
* **Acesso à Câmera / Webcam** (Necessário conceder permissão no navegador caso queira utilizar a funcionalidade de escaneamento e identificação de plantas em tempo real via câmera)

### 3. Backend do Plant AI (API REST)
* Para que a aplicação funcione completamente (autenticação, cadastro de plantas, rotinas de cuidados e análise por IA), é necessário ter o **backend** em execução:
  * Repositório do Backend: **[plant-ai-backend](../plant-ai-backend)**
  * Servidor da API rodando localmente (padrão: `http://localhost:3000`) ou em um servidor remoto.

---

## 🚀 Passo a Passo para Instalação e Execução

### 1. Clonar o Repositório
```bash
git clone https://github.com/plant-ai-app/plant-ai-frontend.git
cd plant-ai-frontend
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto baseado no arquivo de exemplo `.env.example`:

```bash
# No Linux/macOS ou Git Bash:
cp .env.example .env

# No Windows (PowerShell):
copy .env.example .env
```

Abra o arquivo `.env` e confirme o endereço da sua API backend:

```env
# URL base para a API do backend
VITE_API_URL="http://localhost:3000/api"
```

### 4. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em seu navegador no endereço indicado no terminal (normalmente `http://localhost:5173`).

---

## 📜 Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes comandos:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento com Hot Module Replacement (HMR). |
| `npm run build` | Compila e otimiza a aplicação para o ambiente de produção na pasta `dist/`. |
| `npm run preview` | Executa localmente o build de produção gerado para testes pré-deploy. |
| `npm run lint` | Executa o ESLint para verificar e apontar problemas de padrão de código. |

---

## 📋 Variáveis de Ambiente

| Variável | Obrigatória | Padrão | Descrição |
| :--- | :---: | :---: | :--- |
| `VITE_API_URL` | Sim | `http://localhost:3000/api` | URL base do backend Express para envio de requisições e carregamento de imagens/uploads. |

---

## 📁 Estrutura do Projeto

```text
plant-ai-frontend/
├── public/                    # Arquivos estáticos públicos (ícones, logos, favicon)
├── src/
│   ├── components/            # Componentes visuais da interface
│   │   ├── care/              # Componentes de cards e listas de cuidados
│   │   ├── common/            # Componentes reutilizáveis (botões, modais, headers, loaders)
│   │   ├── forms/             # Componentes de formulários e inputs
│   │   ├── layouts/           # Estruturas de layout e navegação
│   │   └── pages/             # Páginas e fluxos da aplicação
│   │       ├── aiAnalysis/    # Tela de análise e diagnóstico botânico por IA
│   │       ├── createCare/    # Criação de lembretes e cuidados
│   │       ├── editCare/      # Edição de cuidados existentes
│   │       ├── forgotPassword/# Recuperação de senha
│   │       ├── history/       # Histórico de cuidados realizados
│   │       ├── home/          # Dashboard principal do usuário
│   │       ├── login/         # Tela de autenticação
│   │       ├── myPlants/      # Lista geral de plantas do usuário
│   │       ├── onBoarding/    # Telas de introdução e boas-vindas
│   │       ├── perfil/        # Perfil do usuário e configurações gerais
│   │       ├── plant/         # Detalhes da planta e ficha de cultivo
│   │       ├── plantSettings/ # Configurações da planta
│   │       ├── register/      # Cadastro de novos usuários
│   │       ├── resetPassword/ # Redefinição de senha com token
│   │       ├── scan/          # Escaneamento via câmera e upload para IA
│   │       ├── schedule/      # Agenda e calendário de cuidados
│   │       └── splash/        # Tela de carregamento inicial (Splash)
│   ├── contexts/              # Contextos globais (Autenticação, tema, estado global)
│   ├── hooks/                 # Hooks personalizados do React
│   ├── routes/                # Configuração de rotas da aplicação (React Router)
│   ├── services/              # Integração com a API (Axios e endpoints)
│   ├── styles/                # Arquivos de estilização global e variáveis CSS
│   ├── App.jsx                # Componente raiz da aplicação
│   └── main.jsx               # Ponto de entrada do React no DOM
├── .env.example               # Modelo de variáveis de ambiente
├── eslint.config.js           # Configurações do linter ESLint
├── index.html                 # Template HTML principal do Vite
├── package.json               # Dependências e scripts do projeto
├── vite.config.js             # Configurações do Vite
└── README.md                  # Documentação do projeto
```

---

## 🧰 Tecnologias Utilizadas

* **Biblioteca Principal:** [React 19](https://react.dev/)
* **Build Tool & Dev Server:** [Vite](https://vite.dev/)
* **Roteamento:** [React Router DOM v7](https://reactrouter.com/)
* **Cliente HTTP:** [Axios](https://axios-http.com/)
* **Animações:** [Framer Motion](https://www.framer.com/motion/)
* **Ícones:** [Lucide React](https://lucide.dev/) e [React Icons](https://react-icons.github.io/react-icons/)
* **Câmera:** [React Webcam](https://www.npmjs.com/package/react-webcam)
* **Padronização de Código:** [ESLint](https://eslint.org/)

---

## 📄 Licença

Este projeto está sob a licença [ISC](LICENSE).
