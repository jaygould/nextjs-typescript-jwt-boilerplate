# Next.js with Typescript and JWT authentication boilerplate V2

I have written a blog post about this starter project and explained some of the key features and challenges faced while developing it, so [check it out](https://jaygould.co.uk/2020-01-31-nextjs-auth-jwt-context-hooks/) if you're interested.

> V1 of this repo is still available in the [V1 branch](https://github.com/jaygould/nextjs-typescript-jwt-boilerplate/tree/v1), but the project is now updated to use a cleaned and organized approach.

## Used tech :computer:

- Docker Compose
- Typescript
- OO approach
- Next JS and React front end
- React Context API and hooks
- Node with Express back end
- JWT authentication
- Sequelize database using PostgreSQL

## Structure :triangular_ruler:

This project has two sections:

- Client side Next.js application built on a [custom Node server](https://nextjs.org/docs/#custom-server-and-routing) for the server side rendered React application.
- Server side API built in Node and Express to handle requests from the Next.js application.

The Next app doesn't have an associated database, as all data is handled on the Node API. This is the preferred way to develop an application according to many (including a core maintainer or Next.js as mentioned in a [Shop Talk Show episode](https://shoptalkshow.com/episodes/354/)).

## Installation (with Docker) :rocket:

1. Change the name of `api/.env.sample` file to `api/.env`, and `client/.env.sample` to `client/.env`.

2. Docker Compose can be used to run the boilerplate for development, allowing the automatic setup of dev environment and database structure. Ensure Docker is installed, and run Docker Compose from the top level directory of the repo:

- Development: run `docker-compose build --no-cache` and then `docker-compose up`
- Development (optional): run `npm install` on the host machine to install dependencies for Typescript definitions

- Production: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

## Tests :sparkles:

Jest is installed on both front and back end of the project. The front end uses Enzyme alongside Jest to test the rendering of the React components, as well as using Jest to test some of the service functions. The back end uses Jest to unit test some of the main auth functions on the server. They have separate config files and tests as the environments differ slightly.

### API

First, shell in to the Docker container with `docker-compose exec api_dev sh`, and then run the test command `npm run test`.

### Client

Test docs for client coming soon.

## Authentication with JWT :closed_lock_with_key:

As the app is server side rendered using Next.js, we get the benefit of having routes protected against unauthorized users in a different way than a normal React application. In the case of a simple React app using Create React App, the whole app is sent down to the browser at the first request. On the other hand, Next provides automatic code splitting and can protect logged-in routes from being accessed by users with invalid JWT's.

The code for this is in `client/src/services/Token.service` and leverages the power of Next's `getInitialProps()` lifecycle method to verify the user's token whether they are on the client or the server side. This is possible because `getInitialProps()` is executed on the client and server side.
