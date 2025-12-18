## Roles & Permissões (RBAC)

| Role | Descrição | Permissões | Onde aparece |
| --- | --- | --- | --- |
| `ADMIN` | Gerente/perfil completo com acesso total à operação, dashboards e gerenciamento de equipes. | `VIEW_DASHBOARD`, `MANAGE_PRODUCTS`, `MANAGE_ORDERS`, `VIEW_ANALYTICS`, `MANAGE_TV_SLIDES`, `EDIT_SETTINGS`, `MANAGE_CUSTOMERS`, `MANAGE_PROMOTIONS`, `MANAGE_USERS`, `ACCESS_CATALOG`, `ACCESS_CHECKOUT`, `PROCESS_PAYMENTS`, `CREATE_TASK`, `RESOLVE_TICKET` | Botão de engrenagem em `src/Layout.jsx`, painel `/profiles`, `Admin*` components, documentação e testes. |
| `SUPERVISOR` | Supervisão das áreas de pessoas e campanhas, foco em KPIs e atendimento humano. | `VIEW_DASHBOARD`, `MANAGE_CUSTOMERS`, `ACCESS_CATALOG`, `ACCESS_CHECKOUT`, `CREATE_TASK`, `RESOLVE_TICKET` | Tela `/profiles` (card “Gente”) e hook `useAuthorization` quando atribuído ao usuário. |
| `CLIENT` | Consumidor final que só precisa navegar pelo catálogo e concluir pedidos. | `ACCESS_CATALOG`, `ACCESS_CHECKOUT` | Catálogo público (`src/pages/Catalog.jsx`), home (`src/pages/Home.jsx`), e perfil “Cliente” da tela `/profiles`. |
| `VISITOR` | Visitante anônimo com acesso apenas à navegação geral. | Nenhuma | Qualquer rota pública pode tratar visitantes sem permissões especiais. |

## Implementação

- `Role` e `Permission` estão centralizados em `src/types/roles.ts`.
- `ROLE_PERMISSIONS` serve como fonte da verdade usada pelo hook `useAuthorization` (`src/hooks/useAuthorization.ts`).
- Ao invés de espalhar `user.role === 'Admin'`, o hook retorna `can(permission)` para determinar acesso, evitando duplicação.
- Os testes (`src/types/roles.test.ts`, `src/hooks/useAuthorization.test.ts`) garantem que cada `Role` receba as permissões corretas.
