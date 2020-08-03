  
const env = require("dotenv").config()

const getEnvironmentVar = (key) => {
    if (key in env.parsed) {
      return env.parsed[key];
    }
    throw new Error("no key in the env");
  };
  
  const config = {
    secretKey: getEnvironmentVar("SUPER_KEY"),
    mailUser: getEnvironmentVar("EMAIL_USERNAME"),
    mailPassword: getEnvironmentVar("EMAIL_PASSWORD"),
    domen: getEnvironmentVar('DOMEN_ADDRESS'),
    user: getEnvironmentVar('USER_DB'),
    host: getEnvironmentVar('HOST_DB'),
    database: getEnvironmentVar('DB_NAME'),
    password: getEnvironmentVar('PASSWORD_DB'),
    port: getEnvironmentVar('PORT_DB'),
  };

 module.exports =  config;
