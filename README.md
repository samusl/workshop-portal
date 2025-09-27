# 📘 Workshop Portal

###  aplicação Fullstack

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

## Screenshots das interfaces

### 🔹 pagina adicionar workshop
<img width="1902" height="937" alt="image" src="https://github.com/user-attachments/assets/9ac8d350-b93b-461b-996d-ea795189aad7" />

### 🔹 Página adicionar colaborador
<img width="1879" height="910" alt="image" src="https://github.com/user-attachments/assets/7e777313-1505-43db-a473-e8625e9334b8" />

### 🔹 Página do workshop para adicionar e remover os colaboradores do workshop selecionado
<img width="1910" height="927" alt="image" src="https://github.com/user-attachments/assets/16903d95-6638-4d00-8822-6dd47f53960e" />

## 📊 Endpoints de Relatórios (Gráficos) (funciona após criar os workshops e colaboradores na própria interface)

A API já retorna os dados prontos para exibição dos gráficos.

### 🔹 Participação por Colaborador (Barras)
<img width="1883" height="745" alt="image" src="https://github.com/user-attachments/assets/fdce9795-95f5-4f41-87c2-b5f851568f93" />

### 🔹 Colaboradores por Workshop (Gráfico de Pizza)
<img width="1901" height="878" alt="image" src="https://github.com/user-attachments/assets/2d4e5701-03e0-4697-93f5-07a8b3e840e1" />
