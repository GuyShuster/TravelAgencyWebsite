import process from 'process';

export default {
    port: process.env.PORT || 80,
    dbURL: process.env.DB_URL || 'mongodb://127.0.0.1:27017/travel-agency',
    jwtSecret: process.env.JWT_SECRET || '8813782aad0e89a1698a60dd4b6aa5c9',
    maxFlightsPerPage: 3,
}