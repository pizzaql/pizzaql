# PizzaQL :pizza:

> Modern OSS Order Management System for Pizza Restaurants.

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

## Goal

The goal of this project is to provide a modern and easy to use order management system with order placement form as well. You can track progress in our TODO list :smile: 

More information coming soon. Please note that this project is currently **work in progress** and you shouldn't use it in production!

## Setup

Note: The following instructions are for developers. Setup instructions for beginners will be provided later.

1. Clone this repository 
2. Enter the `site` directory
3. Run `npm install` to install required dependencies
4. Open the [`settings.js`](https://github.com/xxczaki/pizzaql/blob/master/site/settings.js) file using your favourite editor and change the values of `CLIENTID` and `DOMAIN` to your [Auth0's](https://auth0.com/) ones
5. Open the [`home.js`](https://github.com/xxczaki/pizzaql/blob/98897f42a3a744566262a3f9a3ebbcd1e9ae6dd4/site/pages/home.js#L85) file and update the URL to your own [Prisma](https://www.prisma.io/) GraphQL endpoint
6. Open the [`admin.js`](https://github.com/xxczaki/pizzaql/blob/98897f42a3a744566262a3f9a3ebbcd1e9ae6dd4/site/pages/admin.js#L67) file and update the URL to your own [Prisma](https://www.prisma.io/) GraphQL endpoint
7. Now open the [`prisma.yml`](https://github.com/xxczaki/pizzaql/blob/master/prisma/prisma.yml) file located under the `prisma` folder and change the `endpoint` to your own [Prisma](https://www.prisma.io/) GraphQL endpoint
8. In the `prisma` folder, run `prisma deploy` to deploy your API
9. Go back to the `site` directory and run `npm run dev` to start the application
10. You can access the order placement form at `localhost:3000` and the admin dashboard at `localhost:3000/admin` (you will need to login to see the list of orders)
11. To build the application in the production mode, run `npm run build`

## TODO

**Order Placement System**
* [x]  Basic Frontend
  * [ ] Production-ready Frontend (styles etc.)
* [ ]  Working Backend
  * [x] Creating orders
  * [ ] Sending mail or SMS (?)
* [ ] Payments (?)

**Order Management System**

* [x] Login
  * [x] Full security
* [x]  Basic Frontend
  * [ ] Listening for orders (instead of manual page reloading)
  * [ ] Ability to mark orders as completed
  * [ ] Production-ready Frontend (styles etc.)
* [x]  Working Backend

**Project Page**

* [ ] Home page
* [ ] About page
* [ ] Other pages (like contact form)

**Other**

* [ ] Testing with Jest & Enzyme
* [ ] Move from Prisma Cloud to own GraphQL Yoga server. (?)
* [ ] Documentation
* [ ] Paid support (?)

(?) - unsure.

## Built with:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [styled-components](https://www.styled-components.com/)
- [Bulma](https://bulma.io/)
- [Formik](https://jaredpalmer.com/formik/)
- [Auth0](https://auth0.com/)
- [Prisma](https://www.prisma.io/)
- [GraphQL](https://graphql.org/)
- [Babel](https://babeljs.io/)

and many other awesome technologies :unicorn:

## License

MIT
