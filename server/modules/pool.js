//pg config (local only)
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: '5432'
});

// log connection
pool.on('connect', () => {
    console.log('CONNECTED TO POSTGRES');
});
//check for error
pool.on('error', (error) => {
    console.log(error);
});

module.exports = pool;