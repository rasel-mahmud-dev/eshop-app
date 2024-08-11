require("dotenv").config()

const envConfig = {
    PGHOST: process.env.PGHOST,
    PGDATABASE: process.env.PGDATABASE,
    PGUSER: process.env.PGUSER,
    PGPASSWORD: process.env.PGPASSWORD,
    ENDPOINT_ID: process.env.ENDPOINT_ID,
    SECRET_KEY: process.env.SECRET_KEY
}

export default envConfig