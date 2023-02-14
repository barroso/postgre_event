**Note**: This repo is a PoC.

## The node.js example app

The node.js example app teaches the very basics of how to work with Contentful:

The PoC demonstrate how to create a notification with postgres and listen to that notification with node.js

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
