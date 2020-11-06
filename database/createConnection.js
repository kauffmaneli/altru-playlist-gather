const mysql = require("mysql");
const util = require("util");
const fs = require("fs");
const sleep = require("../functions/sleep");

//Establish connection to MYSQL database

const createConnection = async () => {
  let con;
  try {
    const file = fs.readFileSync("../../THE GOODS/2017/Misc 2017/kc 1.aif");

    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "altrumetrics",
      database: "mydb",
    });
  } catch {
    con = mysql.createConnection({
      host: "altrudb.cpfu3f3muppj.us-east-2.rds.amazonaws.com",
      user: "admin",
      password: "9yXpiI0WAXIY4InKju0z",
      database: "altruData",
    });
  }

  let connected = false;
  while (connected == false) {
    try {
      con.connect();
      connected = true;
    } catch {
      await sleep(500);
      console.log("DB CONNECTION FAILED. ATTEMPTING TO RECCONECT");
    }
  }

  const query = util.promisify(con.query).bind(con);

  return { con, query };
};

module.exports = createConnection;
