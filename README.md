## Todo Api

A simple REST API managing todo list built with Express js.

### Features

- Create, read, update, and delete todo items.
- SQLite database for data storage.
- RESTful endpoints.
- Basic input validation.
- Unit tests with Jest and Supertest.

### Prerequisites
. nodejs
. npm

### Instalation

#### 1. Clone the repository:

```bash
 git clone https://github.com/amuybar/todolist_restapi.git
 cd todolist_restapi
 ```
#### 2. Install dependencies:

``` bash
yarn install
```
#### 3. Database Confiurations:

Configure the database setings at config/config.json.

 ```bash
 {
    "development": {
       "storage": "./database.sqlite",
      "dialect": "sqlite"
    },
    "test": {
       "storage": "./database.test.sqlite",
      "dialect": "sqlite"
   }
 }

```
#### 4. Run Migrations:
```bash
   npx sequelize-cli db:migrate

```
#### 5. Database File:
 The database file database.sqlite will be created in the project root directory.

#### 6. Verify Setup:
 You can verify that the database is set up correctly by running the application and interacting with the AP

### Run Application

`. Dev mode: `

```bash
  npm run dev
  ```
`. Prod mode: `

```bash
  npm start
```

### Run Test
 ```bash
     npm test
```

### Endpoints

. GET    `/api/todos`      -- Get all todos

. GET    `/api/todos/:id`  -- Get specific todo

. POST   `/api/todos`      -- Create a new todos

. PUT    `/api/todos/:id`  -- Update a todo

. DELETE `/api/todos/:id`  -- Delete a todo






# Barrack Amuyunzu
