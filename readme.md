# PizzaQL :pizza:

> Modern OSS Order Management System for Pizza Restaurants.

[![Build Status](https://travis-ci.org/pizzaql/pizzaql.svg?branch=master)](https://travis-ci.org/pizzaql/pizzaql)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

## Goal

The goal of this project is to provide a modern and easy to use order management system with order placement form as well. You can track progress in our TODO list :smile: 

More information coming soon. Please note that this project is currently **work in progress** and you shouldn't use it in production!

## Setup

Note: The following instructions are for developers. Setup instructions for beginners will be provided later.

### Prerequisites

- [Git](https://git-scm.com/)
- Latest [Node.js](https://nodejs.org/)
- [Prisma CLI](https://www.prisma.io/docs/prisma-cli-and-configuration/using-the-prisma-cli-alx4/)
- [Docker Compose](https://docs.docker.com/compose/install/)

1. Clone this repository 
2. Enter the `backend` directory
3. Run `docker-compose up -d` and then `prisma deploy` to start the GraphQL Server
4. Enter the `frontend` directory
5. Edit the `settings.js` file and include your Auth0's client id & domain
6. Run `npm install` to install required dependencies
7. Now run `npm run dev` to start the application in the development mode

- You can access the GraphQL Playground at `http://localhost:4466/`
- You can access the order placement form at `http://localhost:3000` and the admin dashboard at `http://localhost:3000/admin` (you will need to login to see the list of orders)
- To build the application in the production mode, just run `npm run build`

## TODO

**Order Placement System**
* [x]  Basic Frontend
  * [x] Production-ready Frontend (styles etc.)
  * [ ] Dark mode (work in progress, partially implemented)
* [x]  Working Backend
  * [x] Creating orders
* [ ] Better delivery time selection

**Order Management System**

* [x] Login
  * [x] Full security with Auth0
* [x]  Basic Frontend
  * [x] Listening for orders (instead of manual page reloading)
    * [ ] Rewrite to GraphQL Subscriptions
  * [x] Ability to delete orders
  * [ ] Production-ready Frontend (styles etc.)
* [x]  Working Backend

**Project Page**

* [ ] Home page
* [ ] About page
* [ ] Other pages (like contact form)

**Other**

* [x] Testing with Ava & Enzyme
* [x] Move from Prisma Cloud to Docker.
* [ ] Documentation
* [ ] Paid support (?)

(?) - unsure.

## How it works?

![Diagram](diagram.png)

## Built with:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [styled-components](https://www.styled-components.com/)
- [Blueprint](https://blueprintjs.com/)
- [Formik](https://jaredpalmer.com/formik/)
- [Auth0](https://auth0.com/)
- [Prisma](https://www.prisma.io/)
- [GraphQL](https://graphql.org/)
- [Babel](https://babeljs.io/)

and many other awesome technologies :unicorn:

## License

MIT
