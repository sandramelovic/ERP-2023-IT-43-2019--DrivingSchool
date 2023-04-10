import { config } from "dotenv"
config()


export default {
    port: process.env.PORT || 4000,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbServer: process.env.DB_SERVER || '',
    dbDatabase: process.env.DB_DATABASE || '',
    ID_LENGTH: 10,
    ID_ALPHABET: '1234567890abcdef',
    HASH_SALT: 12,
    COOKIE_JWT: 'jwt',
    secret: "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING"

}