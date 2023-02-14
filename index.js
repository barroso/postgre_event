const express = require("express");
const db = require("./db");
const subscriber = require("./subscriber");

const database = "store";
const host = "localhost";   
const dbPort = 5432;
const user = "postgres";
const eventName = "customer_was_added";

(async function () {
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
        res.send('Listen To Postgres Notifications!')
    })

    app.get('/setup_db', (req, res) => {
        db.setupDB();
        res.send(`Database ${database} -> Create Table, Function, Trigger`)
    })

    app.listen(port, () => {
        console.log(`Example listening on port ${port}`)
    })

})();