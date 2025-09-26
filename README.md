# 📘 Workshop Portal

-aplicação Fullstack-

Portal de gerenciamento de **Workshops e Participações de Colaboradores**, desenvolvido em **.NET 7 (API)** e **Angular (Frontend)**.  

O sistema permite:  
✅ Cadastro e gerenciamento de workshops  
✅ Registro de colaboradores presentes em cada workshop  
✅ Visualização da participação através de **gráficos de barras e pizza**  

---

## 🛠️ Tecnologias Utilizadas

### 🔹 Backend (API)
- [.NET 8](https://dotnet.microsoft.com/)  
- Entity Framework Core  
- SQL Server / SQLite  
- Swagger (documentação da API)  

### 🔹 Frontend
- [Angular 16+](https://angular.io/)  
- [ng2-charts](https://valor-software.com/ng2-charts/) + Chart.js  
- scss/css próprio para estilização
- [Node.js](https://nodejs.org/) 

---

## ⚙️ Como Rodar o Projeto

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/samusl/workshop-portal.git
cd workshop-portal
``` 
### 2️⃣ Backend (.NET API)
```bash
cd backend/FastDesafio.Api
dotnet restore
dotnet ef database update   # aplica migrations
dotnet run
```

➡️ API disponível em: http://localhost:5167

➡️ Swagger: http://localhost:5167/swagger

### 3️⃣ Frontend (Angular)
```bash
cd frontend
npm install
npm start
```


➡️ Frontend disponível em: http://localhost:4200

⚠️ O proxy.conf.json já está configurado para redirecionar chamadas para http://localhost:5167.

### 📊 Endpoints de Relatórios (Gráficos) (funciona após criar os workshops e colaboradores na própria interface)

A API já retorna os dados prontos para exibição dos gráficos.

🔹 Participação por Colaborador (Barras)
🔹 Colaboradores por Workshop (Gráfico de Pizza)

