## Perfis e roles

| Role | Descrição | Permissões principais | Onde aparece |
| --- | --- | --- | --- |
| `ADMIN` (gerente) | Operação completa da Provença, com acesso total ao dashboard administrativo, produtos, pedidos e configurações. | `VIEW_DASHBOARD`, `MANAGE_PRODUCTS`, `MANAGE_ORDERS`, `VIEW_ANALYTICS`, `MANAGE_TV_SLIDES`, `EDIT_SETTINGS`, `MANAGE_CUSTOMERS`, `MANAGE_PROMOTIONS`, `ACCESS_CATALOG`, `PROCESS_PAYMENTS`, `ACCESS_CHECKOUT` | Botão de engrenagem em `src/Layout.jsx`, tela `/profiles` (painel administrador), `AdminProfile`, `AdminDashboard`, `AdminPermissions` |
| `SUPERVISOR` (gente) | Supervisão de pessoas, campanhas internas e suporte humanizado. | `VIEW_DASHBOARD`, `MANAGE_CUSTOMERS`, `ACCESS_CATALOG`, `ACCESS_CHECKOUT` | Perfil “Gente” do `/profiles` (explicando flag social) |
| `VENDOR` (vendedor/caixa) | Atendimento direto ao consumidor, fechamento de pedidos e trocas. | `ACCESS_CATALOG`, `PROCESS_PAYMENTS`, `ACCESS_CHECKOUT` | Perfil “Vendedor/Caixa” no `/profiles` |
| `CLIENT` (cliente) | Visita ao site para explorar catálogo e finalizar compras sem login. | `ACCESS_CATALOG`, `ACCESS_CHECKOUT` | Perfil “Cliente” em `/profiles`, vitrine principal `src/pages/Home.jsx` e `/catalog` |

## Esquema uniforme

- `Role` e `Permission` estão consolidados em `src/types/roles.ts`, garantindo nomes verb-noun (`view:dashboard`, `manage:products`).
- O mapeamento `ROLE_PERMISSIONS` serve como fonte da verdade usada pelo hook `useAuthorization` (`src/hooks/useAuthorization.ts`) e pelos testes `src/types/roles.test.ts`.
- O hook expõe flags (`canViewDashboard`, `canManageProducts` etc.) para qualquer página ou componente proteger conteúdo condicionalmente.

## Proteções aplicadas

- O painel `/profiles` usa `useAuthorization` para mostrar se o gerente consegue acessar Dashboard, Produtos, Pedidos, Analytics, Promoções e Clientes (`src/pages/Profiles.jsx`).
- Qualquer rota futura pode chamar `useAuthorization` com os roles do usuário corrente e conferir os booleanos antes de renderizar a UI.
