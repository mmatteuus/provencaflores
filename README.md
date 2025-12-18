# Provença Flores Front-end

Esta é uma versão puramente **front-end** da aplicação de loja Provença Flores. Todas as integrações com plataformas de IA/back-end (Base44, Lovable etc.) foram removidas, restando uma experiência estática preparada para hospedagem em Vercel.

## Desenvolvimento

```bash
npm install
npm run dev
```

O aplicativo roda em <http://localhost:5173> por padrão.

## Produção

```bash
npm run build
```

Usar `npm run preview` para testar a compilação localmente.

## Deploy na Vercel

Este repositório já inclui um `vercel.json` que executa `npm run build` via `@vercel/static-build`. Basta rodar `vercel` (ou `vercel --prod`) na raiz do projeto, selecionar o `framework` como Vite (caso o CLI solicite) e sincronizar o diretório `dist`. Para comportar rotas do SPA, a regra `/ (.*)` mapeia para `index.html`.
