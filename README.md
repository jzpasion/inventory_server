# Inventory Server

A Node.js backend for a warehouse / project material-management system. It exposes a
**REST API** (Express) and a **real-time Socket.IO** layer over a **MySQL** database,
covering inventory stock, material requests (MRS), purchase requests (PRS), material
receipts (MRR), issuance reports, projects, departments, and user login.

> Backend only. It is designed to serve a separate front-end client (web/desktop) that
> consumes both the REST endpoints and the Socket.IO events.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [REST API Reference](#rest-api-reference)
- [Socket.IO Events](#socketio-events)
- [Database Schema](#database-schema)
- [Domain Glossary](#domain-glossary)
- [Known Limitations & Notes](#known-limitations--notes)
- [License](#license)

---

## Features

- 📦 **Inventory** — track stock items with quantity, unit of measure, and pricing.
- 📝 **Material Request Slip (MRS)** — record material requests per project & department.
- 🛒 **Purchase Request Slip (PRS)** — manage purchasing, suppliers, and approval status.
- 📥 **Material Receive Report (MRR)** — log goods received against a request.
- 📤 **Issuance Report** — record materials issued out to a project/department.
- 🏷️ **Projects & Departments** — reference data shared across the above.
- 👤 **User login** — simple username/password lookup.
- ⚡ **Real-time updates** — clients connected via Socket.IO are pushed fresh data
  whenever records change.

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Runtime      | Node.js                             |
| Web server   | [Express](https://expressjs.com/) 4 |
| Real-time    | [Socket.IO](https://socket.io/) 4   |
| Database     | MySQL (via the `mysql` driver)      |
| HTTP body    | `body-parser` (urlencoded)          |
| Dev reload   | `nodemon`                           |

## Architecture

```
                ┌─────────────────────────────────────────┐
   HTTP REST ──▶│  Express app  (app.js)                   │
                │    /api/* routers ─▶ handlers ─▶ MySQL    │
   WebSocket ──▶│  Socket.IO    (server.js)                │
                │    socket events ─▶ handlers ─▶ MySQL     │
                └─────────────────────────────────────────┘
```

- **`server.js`** boots an HTTP server, attaches the Express `app` and a Socket.IO
  instance, and wires every socket event to a handler.
- **`app.js`** configures Express, CORS headers, and mounts the REST routers.
- **`api/route/*`** define the HTTP endpoints; **`api/handler/*`** contain the SQL
  queries. Both REST routers and socket events share the same handler layer.
- All handlers use Node-style **error-first callbacks** and a single shared MySQL
  connection created in `api/config.js`.

## Project Structure

```
inventory_server/
├── server.js                 # HTTP + Socket.IO entry point (npm start)
├── app.js                    # Express app: CORS + REST router mounts
├── package.json
├── inventory_system.sql      # Database schema + seed data
├── BackUp/                   # SQL backups
└── api/
    ├── config.js             # DB connection settings
    ├── route/                # Express routers (REST endpoints)
    │   ├── inventory_route.js
    │   ├── mrs_route.js
    │   ├── department_router.js
    │   ├── project_route.js
    │   ├── user_route.js
    │   ├── purchasing_route.js
    │   └── mrr_route.js
    └── handler/              # SQL query handlers
        ├── inventory_handler.js
        ├── mrs_handler.js
        ├── department_handler.js
        ├── project_handler.js
        ├── user_handler.js
        ├── purchasing_handler.js
        ├── mrr_handler.js
        └── issuance_handler.js   # socket-only (no REST route)
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended) and npm
- A running [MySQL](https://www.mysql.com/) server (e.g. via XAMPP/MariaDB)

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/jzpasion/inventory_server.git
cd inventory_server
npm install
```

### 2. Create the database

Create a database named `inventory_system` and import the provided dump (schema +
seed data):

```bash
mysql -u root -p inventory_system < inventory_system.sql
```

Or import `inventory_system.sql` through phpMyAdmin / MySQL Workbench.

### 3. Configure the connection

Edit [`api/config.js`](api/config.js) to match your MySQL credentials (see
[Configuration](#configuration)).

### 4. Run the server

```bash
npm start          # node server.js
```

For auto-reload during development:

```bash
npx nodemon server.js
```

The server listens on **port `8081`** by default (override with the `PORT`
environment variable). On startup it logs:

```
Listening at port 8081
```

## Configuration

Database settings live in [`api/config.js`](api/config.js):

```js
var dev = {
  apiUrl: "localhost",
  dbConfig: {
    hostname: "localhost",
    user: "root",
    password: "",
    database: "inventory_system",
  },
};
```

| Field      | Description                  | Default            |
| ---------- | ---------------------------- | ------------------ |
| `hostname` | MySQL host                   | `localhost`        |
| `user`     | MySQL user                   | `root`             |
| `password` | MySQL password               | `""` (empty)       |
| `database` | Database name                | `inventory_system` |

The HTTP port is read from `process.env.PORT`, falling back to `8081`. CORS is open
to all origins (`*`) for both REST and Socket.IO.

## REST API Reference

All routers are mounted under `/api`. Request bodies are **`application/x-www-form-urlencoded`**.
Successful responses return `200` with the query result; failures return `500`.

### Inventory — `/api/inventory`

| Method | Endpoint                      | Description                  | Body fields |
| ------ | ----------------------------- | ---------------------------- | ----------- |
| `GET`  | `/api/inventory/getInventory` | List all inventory items     | —           |
| `POST` | `/api/inventory/addInventory` | Add a new inventory item     | `item_name`, `type`, `quantity`, `unit_of_measure`, `unit_price`, `total` |

### Material Request (MRS) — `/api`

| Method | Endpoint                 | Description                                     | Body fields |
| ------ | ------------------------ | ----------------------------------------------- | ----------- |
| `GET`  | `/api/getMRS`            | List all material requests                      | —           |
| `GET`  | `/api/getMrsPurchasing`  | List purchasing view joined to MRS/dept/project | —           |
| `POST` | `/api/addMRS`            | Create a material request                       | `mrs_number`, `request_by`, `project_id`, `department_id`, `date`, `item_number`, `description`, `quantity`, `unit`, `type` |

### Department — `/api/department`

| Method | Endpoint                              | Description                       | Body fields |
| ------ | ------------------------------------- | --------------------------------- | ----------- |
| `GET`  | `/api/department/getDepartment`       | List all departments              | —           |
| `GET`  | `/api/department/getCompanyDepartment`| List departments for a company    | query string: `?company=...` |

### Project — `/api/project`

| Method | Endpoint                    | Description       | Body fields |
| ------ | --------------------------- | ----------------- | ----------- |
| `GET`  | `/api/project/getProjects`  | List all projects | —           |

### User — `/api/user`

| Method | Endpoint                                  | Description                          | Params |
| ------ | ----------------------------------------- | ------------------------------------ | ------ |
| `GET`  | `/api/user/getUser/:username/:password`   | Look up a user by username/password  | route params: `username`, `password` |

### Purchasing (PRS) — `/api/purchasing`

| Method | Endpoint                                  | Description                                | Fields |
| ------ | ----------------------------------------- | ------------------------------------------ | ------ |
| `GET`  | `/api/purchasing/getPRS`                  | List all purchase requests (enriched join) | —      |
| `POST` | `/api/purchasing/addPRS`                  | Create a purchase request (`STATUS` defaults to `PENDING FOR APPROVAL`) | body: `date_request`, `prs_number`, `mrs_id`, `project_id` |
| `PUT`  | `/api/purchasing/updatePRS/:purchasing_id` | Update price/supplier/status/delivery date | route param: `purchasing_id`; body: `unit_price`, `total_price`, `supplier`, `status`, `date_delivered` |

### Material Receive (MRR) — `/api/mrr`

| Method | Endpoint              | Description                       | Body fields |
| ------ | --------------------- | --------------------------------- | ----------- |
| `GET`  | `/api/mrr/getMRR`     | List all material receive records | —           |
| `POST` | `/api/mrr/addMRR`     | Create a material receive record  | `prj_id`, `mrs_id`, `quantity`, `unit_cost`, `sub_total`, `type`, `date_delivered` |

## Socket.IO Events

Connect a Socket.IO client to the server URL (e.g. `http://localhost:8081`). CORS is
open to all origins.

On **connection**, the server immediately emits a snapshot of every dataset:
`getInventories`, `getDepartments`, `getProjects`, `getMRS`, `getPurchasing`,
`getMRR`, `getMrsDetailed`, and `getIssuance`.

### Events the client can emit

**Refresh / fetch** (server responds with the matching emit above):

| Client emits          | Server responds with |
| --------------------- | -------------------- |
| `getInventory`        | `getInventories`     |
| `getDepartment`       | `getDepartments`     |
| `getProject`          | `getProjects`        |
| `getMRSS`             | `getMRS`             |
| `getDetailedMrs`      | `getMrsDetailed`     |
| `getAllPurchasing`    | `getPurchasing`      |
| `getMRRS`             | `getMRR`             |
| `getIssuanceDetails`  | `getIssuance`        |

**Auth (with acknowledgement callback):**

| Event     | Arguments                   | Description                                  |
| --------- | --------------------------- | -------------------------------------------- |
| `getUser` | `(username, password, cb)`  | Looks up a user; result returned via `cb`.   |

**Mutations** (server persists then broadcasts a refresh to all clients):

| Event                    | Arguments                                                                                       | Broadcast(s) |
| ------------------------ | ----------------------------------------------------------------------------------------------- | ------------ |
| `addInven`               | `item_name, type, quantity, unit_of_measure, unit_price, total`                                 | `update_inventory_table` |
| `updateInventory`        | `item_name, type, quantity, unit_of_measure, unit_price, total, id`                             | `update_inventory_table` |
| `updateQuantityInventory`| `quantity, id`                                                                                  | `update_inventory_table` |
| `addMrs`                 | `mrs_number, request_by, project_id, department_id, date, item_number, description, quantity, unit, type` | `update_mrs_table`, `update_mrs_table_simple` |
| `addIssuance`            | `mrs_number, request_by, project_id, department_id, date, item_number, description, quantity, unit, type` | `update_issuance_table` |
| `addPrs`                 | `date_request, mrs_id, project_id` (PRS number auto-incremented)                                | `update_prs_table` |
| `updatePrs`              | `unit_price, total_price, supplier, status, date_delivered, pr_id`                              | `update_prs_table` |
| `updatePrsStatus`        | `status, pr_id`                                                                                 | `update_prs_table` |
| `addMrr`                 | `prj_id, mrs_id, quantity, unit_cost, sub_total, type, date_delivered`                          | `update_mrr_table` |
| `addDepartment`          | `dep_name, company`                                                                             | `update_department_table` |
| `addProject`             | `code, project_name, start_date, end_date`                                                      | `update_project_table` |
| `updateProject`          | `code, client, park, country, project_name, start_date, end_date, prj_id`                       | `update_project_table` |

> 💡 The Socket.IO layer exposes more functionality than REST — inventory updates,
> issuance, PRS/MRR creation, and department/project mutations are only available
> over sockets.

## Database Schema

Database: **`inventory_system`**. No foreign-key constraints are declared in the dump;
relationships are logical (matching ID columns), so referential integrity is enforced
by the application, not the database.

| Table                   | Purpose                                              | Key columns |
| ----------------------- | ---------------------------------------------------- | ----------- |
| `inventory_table`       | Stock items (standalone)                             | `ID` (PK), `ITEM_NAME`, `TYPE`, `QUANTITY`, `UOM`, `UNIT_PRICE`, `TOTAL`, `DATE_ADDED` |
| `material_request_form` | Material Request Slip (MRS) line items               | `MRS_ID` (PK), `MRS_NUMBER`, `REQUEST_BY`, `PROJECT_ID`, `DEPARTMENT_ID`, `DATE`, `ITEM_NUMBER`, `DESCRIPTION`, `QUANTITY`, `UNIT`, `TYPE` |
| `material_receive_form` | Material Receive Report (MRR)                        | `MRR_ID` (PK), `PROJECT_ID`, `MRS_ID`, `QUANTITY`, `UNIT_COST`, `SUB_TOTAL`, `DATE_DELIVERED`, `TYPE` |
| `purchasing_table`      | Purchase Request Slip (PRS)                          | `PURCHASING_ID` (PK), `DATE_REQUEST`, `PRS_NUMBER`, `MRS_ID`, `PROJECT_ID`, `UNIT_PRICE`, `TOTAL_PRICE`, `SUPPLIER`, `STATUS`, `DATE_DELIVERED` |
| `issuance_report`       | Materials issued out against an MRS                  | `ISSUANCE_ID` (PK), `MRS_NUMBER`, `REQUEST_BY`, `DESCRIPTION`, `QUANTITY`, `UNIT`, `TYPE`, `PROJECT_ID`, `DEPARTMENT_ID`, `DATE`, `ITEM_NUMBER` |
| `project_table`         | Projects (code, client, location, schedule)          | `PROJECT_ID` (PK), `CODE`, `CLIENT`, `PARK`, `COUNTRY`, `PROJECT_NAME`, `START_DATE`, `END_DATE` |
| `department_table`      | Departments per company                              | `DEPARTMENT_ID` (PK), `DEPARTMENT_NAME`, `COMPANY`, `DATE_ADDED` |
| `user_table`            | Login accounts (plaintext password + role)           | `USER_ID` (PK), `USERNAME`, `PASSWORD`, `DEPARTMENT` |

**Relationships (logical):**

```
material_request_form.PROJECT_ID    ─▶ project_table.PROJECT_ID
material_request_form.DEPARTMENT_ID ─▶ department_table.DEPARTMENT_ID
material_receive_form.MRS_ID        ─▶ material_request_form.MRS_ID
material_receive_form.PROJECT_ID    ─▶ project_table.PROJECT_ID
purchasing_table.MRS_ID             ─▶ material_request_form.MRS_ID
purchasing_table.PROJECT_ID         ─▶ project_table.PROJECT_ID
issuance_report.PROJECT_ID          ─▶ project_table.PROJECT_ID
issuance_report.DEPARTMENT_ID       ─▶ department_table.DEPARTMENT_ID
issuance_report.MRS_NUMBER          ─▶ material_request_form.MRS_NUMBER (loose link)
```

`inventory_table` is standalone. `user_table.DEPARTMENT` is a free-text role string
(`sdt`, `admin`, `warehouse`, `purchasing`), not a foreign key.

## Domain Glossary

| Term    | Meaning                                                                 |
| ------- | ----------------------------------------------------------------------- |
| **MRS** | Material Request Slip — a request for materials by a project/department. |
| **PRS** | Purchase Request Slip — a purchasing record raised against an MRS.       |
| **MRR** | Material Receive Report — goods received against a request.              |
| **UOM** | Unit of Measure.                                                        |

## Known Limitations & Notes

This is an in-progress / learning project. A few things to be aware of before using it
in production:

- **Authentication & security:** passwords are stored and compared in **plaintext**,
  and `getUser` passes the password in the URL. There is no auth middleware, session,
  or token — every endpoint is public. CORS is open to `*`.
- **Database connection:** a single shared `mysql.createConnection` is opened at
  startup (no pool, no reconnect). `con.connect` throws on failure, which crashes the
  process; a dropped connection breaks subsequent queries.
- **Validation:** input checks use truthiness, so a legitimate value of `0`
  (e.g. `quantity = 0`) is rejected as "Invalid Parameters". Validation failures also
  return HTTP `500` rather than `400`.
- **Unwired handlers:** several handlers are implemented but have no REST route
  (e.g. `updateInventory`, `updateInventoryQuantity`, `addDepartment`, `addProject`,
  `updateProject`, `getMrsDetailed`, `updatePRSStatus`) — some of these are reachable
  only via Socket.IO.
- **Migration:** uses the legacy `mysql` driver; migrating to `mysql2` would be a
  near drop-in upgrade and adds connection pooling and Promise support.

> All write queries that take user input use parameterized (`?`) placeholders, so the
> main SQL-injection surface is covered.

## License

ISC © zyrel pasion
