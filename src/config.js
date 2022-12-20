const { config } =  require('dotenv')

config()
const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '5uWv~exq..#y';
const DB_DATABASE = process.env.DB_DATABASE || "juareznumberone";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
// const EMAIL_HOST = process.env.EMAIL_HOST;
// const EMAIL_SECURECONNECTION = process.env.EMAIL_SECURECONNECTION;
// const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
// const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// const EMAIL_TLSCIPHERS = process.env.EMAIL_TLSCIPHERS;
const SITE_HOST = process.env.SITE_HOST;
const SITE_NAME = process.env.SITE_NAME;
const SECRETKEY = process.env.SECRETKEY;
const EMAIL_SETTINGS = {
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,        
    auth: {
      user: 'gimos@gbnaat.com',
      pass: 'QQbiq893'
    },
    tls:  { ciphers: 'SSLv3' }, 
    }
const DB = {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    DB_PORT
}
module.exports = 
    {
        PORT,
        DB_USER,
        DB_PASSWORD,
        DB_DATABASE,
        DB_HOST,
        DB_PORT,
        // EMAIL_HOST,
        // EMAIL_SECURECONNECTION,
        // EMAIL_PORT,
        EMAIL_USER,
        // EMAIL_PASSWORD,
        // EMAIL_TLSCIPHERS,
        SITE_HOST,
        SITE_NAME,
        EMAIL_SETTINGS,
        SECRETKEY,
        DB
    }
