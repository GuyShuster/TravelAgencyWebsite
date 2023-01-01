import process from 'process';

export default {
    port: process.env.PORT || 80,
    dbURL: process.env.DB_URL || 'mongodb://127.0.0.1:27017/travel-agency',
    maxFlightsPerPage: 3,
    userTypes: {
        ADMIN: 1,
        REGULAR: 2,
    }
}