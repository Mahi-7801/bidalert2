require('dotenv').config({ path: require('path').join(__dirname, '.env') });
// Database Configuration
// Copy this to .env file in the backend directory

/*
DB_HOST=localhost
DB_USER=bidalert2
DB_PASSWORD=bidalert@#123vcs
DB_NAME=bidalert_v5
DB_PORT=3306

PORT=5000
NODE_ENV=development

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024

FRONTEND_URL=http://localhost:3000
*/

module.exports = {
    database: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
        database: process.env.DB_NAME || 'bidalert_v5',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        charset: 'utf8mb4'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-2024',
        expiresIn: '7d'
    },
    server: {
        port: process.env.PORT || 5000,
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
    },
    email: {
        user: 'support@bidalert.in'
    },
    gemini_api_key: process.env.GEMINI_API_KEY || 'your_gemini_api_key_here'
};
