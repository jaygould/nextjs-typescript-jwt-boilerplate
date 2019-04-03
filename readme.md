# Next.js with Typescript and JWT authentication boilerplate

I have written a blog post about this starter project and explained some of the key features and challenges I overcame while developing it, so [check it out]() if you're interested.

## Structure

This project has two separate sections:

* Client side Next.js application built on a [custom Node server](https://nextjs.org/docs/#custom-server-and-routing) for the server side rendered React application.
* Server side API built in Node and Express to handle requests from the Next.js application.

The Next app doesn't have an associated database, as all data is handled on the Node API. This is the preferred way to develop an application according to many (including a core maintainer or Next.js as mentioned in a recent [Shop Talk Show episode](https://shoptalkshow.com/episodes/354/)).

## Installation

Clone the repository:

`git clone https://github.com/jaygould/nextjs-typescript-jwt-boilerplate.git`

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

## Running the project

In dev and production, the front end is set to run on port :3000, and the back end on :1138, but you can change these in the `server.ts` files. In dev mode, both projects watch for changes and refresh automatically.

### Running locally for development

To run the Next.js app locally:

`cd client && npm run dev`

Run the Node API locally:

`cd api && npm run dev`

### Running in production

To run the Next.js app in production:

`cd client && npm run start`

Run the Node API in production:

`cd api && npm run prod`

## Authentication with JWT

As the app is server side rendered using Next.js, we get the benefit of having routes protected against unauthorized users in a different way than a normal React application. In the case of a simple React app using Create React App, the whole app is sent down to the browser at the first request. On the other hand, Next provides automatic code splitting and can protect logged-in routes from being accessed by users with invalid JWT's. 

The code for this is in `client/ui/pages/_app.tsx` and leverages the power of Next's `getInitialProps()` lifecycle method to verify the user whether they are on the client or the server side. This is possible because `getInitialProps()` is executed on the client and server side. 

This `client/ui/pages/_app.tsx` file is key to structuring which pages are restricted to registered users.

**TODO: create a config section to handle routing in order to tidy up and automate the `_app.tsx` page.**

## Testing

Jest is installed on both front and back end of the project. The front end uses Enzyme alongside Jest to test the rendering of the React components, as well as using Jest to test some of the service functions. The back end uses Jest to unit test some of the main auth functions on the server. They have separate config files and tests as the environments differ slightly.

To run tests in both parts of the project, just `cd` to the relevant directory and run `npm run test`. 

