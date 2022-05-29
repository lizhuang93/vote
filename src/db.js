
const mysql = require('mysql');
function query(sql) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      

      host: 'localhost',
      // password: 'Lz931130',
      // host: '39.98.139.162',
      password: 'root',
      user: 'root',
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