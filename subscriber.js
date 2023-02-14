const createSubscriber = require("pg-listen");

const database = "store";
const host = "localhost";   
const dbPort = 5432;
const user = "postgres";
const eventName = "customer_was_added";

(async function () {
    const subscriber = createSubscriber({
        connectionString: `postgres://${user}@${host}:${dbPort}/${database}`,
    });

    await subscriber.connect();
    await subscriber.listenTo(eventName);

    subscriber.notifications.on(eventName, async (payload) => {
        console.log("Was added to the database", JSON.stringify(payload));
    });
})();