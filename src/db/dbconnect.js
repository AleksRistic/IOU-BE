require("dotenv").config();
const mssql = require("mssql");
const logger = require("../util/log");

async function getConnection() {
  try {
    var connection = await mssql.connect({
      server: process.env.HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      // port: process.env.DB_PORT,
      options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
      queueLimit: 0, // unlimited queueing
      connectionLimit: 0, // unlimited connections

      queryFormat: function (query, values) {
        if (!values) return query;
        return query.replace(
          /\:(\w+)/g,
          function (txt, key) {
            if (values.hasOwnProperty(key)) {
              return this.escape(values[key]);
            }
            return txt;
          }.bind(this)
        );
      },
    });
    console.log("Opened Connection");
  } catch (err) {
    logger.error(`❌ Creating db connection errored: ${err.message}`);
  }
  return connection;
}

module.exports = { getConnection };
