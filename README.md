# 🧪 Testes Automatizados da API Restful Booker com Playwright e 

![Playwright CI](https://github.com/SavioHolandaQA/Playwright-API-Actions/actions/runs/14643312971)

Este projeto implementa testes automatizados para a **API Restful Booker** utilizando **Node.js** e **Playwright**. O fluxo de testes cobre o ciclo completo de uma reserva: autenticação, criação, leitura, atualização, exclusão e verificação de dados, com execução automática através de **GitHub Actions**.

---

## 🚀 Funcionalidades Testadas

1. 🔐 **Autenticação** para obter o token (`POST /auth`)
2. ✅ **Criação de uma nova reserva** (`POST /booking`)
3. 🔍 **Consulta da reserva criada** (`GET /booking/{id}`)
4. ✏️ **Atualização da reserva** (`PUT /booking/{id}`)
5. 🧾 **Validação da reserva atualizada** (`GET /booking/{id}`)
6. 🗑️ **Exclusão da reserva** (`DELETE /booking/{id}`)
7. ❌ **Verificação de exclusão** (`GET /booking/{id}` → 404)

---

## 🧪 Tecnologias Utilizadas

- **Node.js**
- **Playwright** (para automação de testes HTTP)
- **GitHub Actions** (para integração contínua)


---

## 🧬 Como Executar

1. Instale as dependências:
   ```bash
   npm install

Execute os testes:
npx playwright test


🧪 Exemplo de Saída Esperada
Durante os testes, você verá logs como:

 🔑 Token obtido: abc123xyz
 🆔 Reserva criada com ID: 1010
 📋 Detalhes da reserva: { firstname: "Savio", lastname: "QA", totalprice: 222, ... }
 🔄 Reserva atualizada: { firstname: "Savio", lastname: "QA Atualizado", ... }
 🗑️ Reserva deletada com sucesso!
 ❌ Confirmação de deleção 

 👤 Autor
Sávio Holanda do Nascimento

