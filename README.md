# Tickets Giphy - Backend

Este es el backend de la plataforma "Tickets Giphy", que utiliza Node.js, Express y Sequelize para gestionar tickets, incluyendo la integración con la API de Giphy.

## Requisitos

- Node.js (v14 o superior)
- MySQL para la base de datos

## Configuración

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tickets-giphy-backend.git
   cd tickets-giphy-backend

2. npm install

3. Colocar el .env

    DB_HOST=your-database-host
    DB_NAME=your-database-name
    DB_USER=your-database-user
    DB_PASS=your-database-password
    DB_DIALECT=mysql
    PORT=3010

    GIPHY_API_KEY=your-giphy-api-key

4. ejecutar aplicacion:

    dev: npm run dev

    prod: npm start



5. API Endpoints

GET /api/tickets - Obtiene todos los tickets.
POST /api/tickets - Crea un nuevo ticket.
PUT /api/tickets/:id - Actualiza un ticket existente.
DELETE /api/tickets/:id - Elimina un ticket.
PATCH /api/tickets/:id/status - Actualiza el estado de un ticket (Pendiente o Completado).