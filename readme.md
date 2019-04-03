# Next.js with Typescript and JWT authentication boilerplate

I have written a blog post about this starter project and explained some of the key features and challenges I overcame while developing it, so [check it out]() if you're interested.

## Structure

This project has two separate sections:

* Client side Next.js application built on a [custom Node server](https://nextjs.org/docs/#custom-server-and-routing) for the server side rendered React application.
* Server side API built in Node and Express to handle requests from the Next.js application.

The Next app doesn't have an associated database, as all data is handled on the Node API. This is the preferred way to develop an application according to many (including a core maintainer or Next.js as mentioned in a recent [Shop Talk Show episode](https://shoptalkshow.com/episodes/354/)).

## Installation

Install dependencies for the front end:

`cd client && npm i`

Install dependencies for the back end:

`cd api && npm i`

### Setting up the database

This project uses a PostgreSQL database with the use of Sequelize - a powerful ORM which makes working with Postgres very simple. You can either set up a local Postgres database by installing Postgres on your machine and following [this link](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb) for a great guide, or you can create a free account and remote database on something like Heroku.

Which ever way you decide to create a database, be sure to update the environment variables to reflect your new database credentials:

* Change the name of the `api/.env.sample` file to `api/.env`
* Update the `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `DB_HOST` variables to your own

If you'd rather not use Postgres, you could easily swap it out for MySQL, MSSQL or MariaDB. That's one of the advantages of Sequelize :). Just go to `api/db/config.ts` and update the `dialect` property from `postgres` to any database from the [Sequelize docs](http://docs.sequelizejs.com/manual/getting-started.html).