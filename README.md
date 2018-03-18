# node-todo-api

A to-do list API server built using NodeJS and MongoDB with user authentication

## Install Dependencies

```bash
yarn install
```

## Scripts

* `yarn start`: start the server
* `yarn test`: run unit tests
* `yarn test-watch`: run unit tests using nodemon

## config.json
The server requires the following parameters be defined under the `test` and `development` keys inside of `/server/config/config.json`:

* `PORT`
* `MONGODB_URI`
* `JWT_SECRET`

An example config file would look like this:
```
{
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
    "JWT_SECRET": "secret test salt"
  },
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest",
    "JWT_SECRET": "secret dev salt"
  }
}
```

When running on a platform like Heroku, these variables will be set by the runtime environment.
