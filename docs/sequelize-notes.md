# Sequelize Notes

Tutorial on setting up Sequelize:
[Scotch Sequelize Tutorial](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)

Good gist with general information on Sequelize.
Has information on how to create migrations and seed for sequelize.

[Sequelize + Express Starter Guide](https://gist.github.com/JoeKarlsson/ebb1c714466ae3de88ae565fa9ba4779)

## config.json

The config.json file contain our application configuration settings, such as database authentication configuration. migrations folder will hold our application's migrations, while the models folder will hold the application models. Seed data is initial data provided with a system for testing, training or templating purposes. The seeders folder typically holds seed data, but we're not going to be using that in this tutorial.

# Heroku

Connecting to Heroku Postgres Databases from Outside of Heroku

https://devcenter.heroku.com/articles/connecting-to-heroku-postgres-databases-from-outside-of-heroku

# CLI
```
$ sequelize db:migrate        # Run pending migrations.
$ sequelize db:migrate:undo   # Revert the last migration run.
$ sequelize help              # Display this help text.
$ sequelize init              # Initializes the project.
$ sequelize migration:create  # Generates a new migration file.
$ sequelize version           # Prints the version number.
```

Must add `--config` flag when running sequelize commands since the config is a `js` file and not the default `json`.

For example `sequelize --config ./src/database/config/config.js db:migrate`

## Create migrations

```
sequelize --config ./src/database/config/config.js migration:create --name migration-name
```

## Creating a seed file

```
sequelize --config ./src/database/config/config.js seed:create --name seed-name
```

Stubs a seed file at `/src/database/seeder`.
