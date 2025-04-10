require("dotenv").config();
const mysql = require("mysql2");
const util = require("util");

// Software Database
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SOFTWARE,
});

const getConnectionPromise = util.promisify(pool.getConnection).bind(pool);
const queryPromise = util.promisify(pool.query).bind(pool);

module.exports = { queryPromise }