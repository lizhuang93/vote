
const mysql = require('mysql');
function query(sql) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Lz931130',
      database: 'vote',
    });
    connection.connect();

    connection.query(sql, (err, data, fields) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    });

    connection.end();
  })
}

module.exports = {
  query,
}