# [![PizzaQL](media/logo/horizontal-scaled.png)](https://github.com/pizzaql/pizzaql)

> Modern OSS Order Management System for Pizza Restaurants.

[![Build Status](https://travis-ci.org/pizzaql/pizzaql.svg?branch=master)](https://travis-ci.org/pizzaql/pizzaql)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

<p align="left">
  <a href="https://opencollective.com/pizzaql" target="_blank">
    <img src="https://cdn-std.dprcdn.net/files/acc_649651/Q5nVhT" height="80" alt="Open Collective">
  </a>
  <a href="https://www.patreon.com/akepinski" target="_blank">
    <img src="https://cdn-std.dprcdn.net/files/acc_649651/plrSCT" height="80" alt="Patreon">
  </a>
</p>

## Goal

The goal of this project is to provide a modern and easy to use order management system with order placement form as well. You can track progress in our TODO list :smile: 

## Docs

> Please note, that we are currently preparing a new docs for PizzaQL. Stay tuned 🙌

[Here :zap:](https://docs.pizzaql.tech/)

## Screenshots

![Order Placement Form](media/screenshots/form.png)
![Dashboard)](media/screenshots/dashboard.png)

[See more screenshots](https://github.com/pizzaql/pizzaql/tree/master/media/screenshots)

## TODO

**Order Placement System**
* [x]  Basic Frontend
  * [x] Production-ready Frontend (styles etc.)
  * [x] Rewrite to Apollo Client
  * [x] Use HTML5 form validation wherever possible
  * [x] Implement prices
  * [x] Online payments via Stripe
    * [ ] Rewrite online payments to use react-stripe-elements
  * [x] Delivery time selection
    * [x] Display delivery time based on current hour
  * [x] Rewrite to @apollo/react-hooks
  * [ ] Rewrite to use react-hook-form
* [x]  Working Backend
    * [x] Creating orders
* [x] Thank you page
    * [x] Ability to copy order id
    * [x] Display simplified order id
    * [x] Show time left to order delivery
    * [x] Rewrite to @apollo/react-hooks

**Order Management System**

* [x] Login
  * [x] Full security with Auth0
* [x]  Basic Frontend
  * [x] Listing orders
    * [x] Rewrite to @apollo/react-hooks
    * [ ] Rewrite to GraphQL Subscriptions (**WIP**)
  * [x] Ability to change order status
  * [x] Ability to delete orders
    * [x] Confirmation alert
  * [x] Ability to manually add orders
  * [ ] Ability to delete all orders with 1 click
  * [ ] Ability to sort orders
  * [ ] Production-ready Frontend (styles etc.)
* [x]  Working Backend

**Documentation**

* [x] Guides
  * [x] Development
  * [x] Production
  * [ ] Security
  * [ ] Deployment

**Other**

* [x] Rewrite backend to Prisma 2
* [ ] Testing with Cypress.io
* [ ] Integration with Algolia Places API (?)
* [ ] Release a public demo (**WIP**)

(?) - unsure.

## Technology Stack

**Frontend:**

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Apollo Client](https://github.com/apollographql/apollo-client)
- [styled-components](https://www.styled-components.com/)
- [Blueprint](https://blueprintjs.com/)

**Backend:**

- [Prisma 2](https://github.com/prisma/prisma2)
- [GraphQL](https://graphql.org/)
- [Auth0](https://auth0.com/)

## Sponsors

  <a href="https://www.digitalocean.com/" target="_blank">
    <img src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_blue.svg" width="400" alt="Digital Ocean">
  </a>
  <br/>
  <a href="https://saucelabs.com" target="_blank">
    <img src="media/sponsors/saucelabs-logo.svg" width="400" alt="Sauce Labs">
  </a>

## License

MIT
