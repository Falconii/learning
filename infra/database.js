const pgp = require('pg-promise')();

/*
const db = pgp({
    user: 'postgres',
    password: 'dmcm0yHrIfOxnVhzWoUd',
    host: 'containers-us-west-155.railway.app',
    port: 7513,
    database: 'railway'
});
*/

db = null;

if (process.env.PORT) {

    db = pgp({
        user: 'postgres',
        password: 'dmcm0yHrIfOxnVhzWoUd',
        host: 'containers-us-west-155.railway.app',
        port: 7513,
        database: 'railway'
    });

} else {

    db = pgp({
        user: 'postgres',
        password: 'dmcm0yHrIfOxnVhzWoUd',
        host: 'containers-us-west-155.railway.app',
        port: 7513,
        database: 'railway'
    });

    /*
        db = pgp({
            user: 'postgres',
            password: '123456',
            host: 'localhost',
            port: 5432,
            database: 'db_control_time_auditor_homologacao'
        });
    */
}

module.exports = db;