const { Pool } = require('pg');
const { user, host, database, password, port } = require('../config');

const options = { user, host, database, password, port };

const pool = new Pool(options);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
