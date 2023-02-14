const { Client } = require("pg");

const database = "store";
const tableName = "customer";
const notifyFunctionName = "customer_changed_function";
const triggerName = "customer_save_trigger";
const eventName = "customer_was_added";

const dbClient = new Client({
    host: "localhost",
    user: "postgres",
    database: database,
    port: 5432,
});

dbClient
  .connect()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error', err.stack))

exports.setupDB = async () => {
    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS ${tableName}(
            id serial PRIMARY KEY,
            name VARCHAR ( 150 ), 
            email VARCHAR ( 100 ), 
            created_on TIMESTAMP NOT NULL
        )`
    );

    await dbClient.query(
        `CREATE OR REPLACE FUNCTION ${notifyFunctionName}()
            RETURNS TRIGGER
            LANGUAGE PLPGSQL
            AS $$
                DECLARE 
                    payload TEXT;
                BEGIN
                    payload := json_build_object('id', NEW.id, 'name', NEW.name, 'email', NEW.email);
                    PERFORM pg_notify('${eventName}'::text, payload);
                    RETURN NULL;
                END;
            $$`
        );

    await dbClient.query(
        `CREATE TRIGGER ${triggerName} AFTER INSERT ON ${tableName}
        FOR EACH ROW EXECUTE FUNCTION ${notifyFunctionName}()`
    );
}
