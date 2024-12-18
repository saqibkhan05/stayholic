// src/config.js
const isProduction = false; // Set this to true when in production

const config = {
    apiBaseURL: isProduction ? 'https://stayholic.com' : 'http://127.0.0.1:8000',
};

export default config;
