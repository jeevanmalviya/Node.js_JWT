require("dotenv").config(); // config is the method provided by .env load enviroment variable

const databaseObject = require(process.env.DB_TYPE);

let query = null;
let dbType = 0;// 1 for mssql , 2 for mysql

if (process.env.DB_TYPE === "mssql") {
  dbType = 1;
  // Create a connection pool to the mssql database
  const pool = new databaseObject.ConnectionPool({
    server: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: {
      encrypt: true,
      trustServerCertificate: true, //Change to false if you want to validate the server certificate
    },
  });

  // Function to query the database
  query = async (text, params) => {
    try {
      await pool.connect();
      const result = await pool.request().query(text);
      return result.recordset;
    } catch (error) {
      console.error("Database(mssql) query error:", error);
      throw error;
    } finally {
      await pool.close();
    }
  };
} else if (process.env.DB_TYPE === "mysql2/promise") {
  dbType = 2;
  // Create a connection pool for MySQL
  const connection = databaseObject.createPool({
    host: process.env.DB_MYSQL_HOST,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_NAME,
    port: process.env.DB_MYSQL_PORT,
  });
  // Function to query the database
  query = async (text, params) => {
    try {
      // const con= await connection.getConnection();
      const [result] = await connection.execute(text, params);
      return result;
    } catch (error) {
      console.error("Database(mysql2) query error:", error);
      throw error;
    }
  };
}
module.exports = {
  query,
  dbType,
};
