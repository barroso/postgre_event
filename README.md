**Note**: This repo is a PoC.

## The node.js example app

The node.js example app teaches the very basics of how to work with Contentful:

The PoC demonstrate how to create a notification with postgres and listen to that notification with node.js

## Postgresql
 Postgresql version > 9

 The NOTIFY command sends a notification event together with an optional “payload” string to each client application that has previously executed LISTEN channel for the specified channel name in the current database. Notifications are visible to all users.

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/barroso/postgre_event.git
cd postgre_event
```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.


## Config

const database = "store";\
const host = "localhost";\
const dbPort = 5432;\
const user = "postgres";\
const eventName = "customer_was_added";

## Routes
[http://localhost:3000/](http://localhost:3000/) Listen To Postgres Notifications!

[http://localhost:3000/setup_db](http://localhost:3000/setup_db) :warning: Create Table, Function, Trigger

## Example
Insert customer
```bash
insert into customer(name, email, created_on) values ('John', 'john@email.com', now());
```

Result Console
```bash
> postgre_event@1.0.0 start
> node index.js

Example listening on port 3000
Database connected
Was added to the database {"id":3,"name":"John","email":"john@email.com"}
```
## References
[https://www.postgresql.org/docs/current/sql-notify.html](https://www.postgresql.org/docs/current/sql-notify.html)

[https://www.npmjs.com/package/pg-listen](https://www.npmjs.com/package/pg-listen)

[https://codewithwolf.com/postgres-notification-listener-node-js](https://codewithwolf.com/postgres-notification-listener-node-js) 

## Trigger X Notify
The trigger needs to know the service\
Notify simply public an event\
We can have more than one listen

## :warning: Warning
1. There may be message loss if the subscriber is offline or there are network problems:
2. Maximum message size, has a limit per message. So no very large payload;
3. Maximum message buffer size in Postgres. It is possible to configure; If the subscriber does not consume the messages at the sending rate, the buffer can grow too much and overflow, losing messages;
4. Consecutive identical messages can be discarded. At the end the subscriber receives only the last one;
5. Upon restarting Postgres, messages are lost;