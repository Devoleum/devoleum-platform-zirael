# Devoleum Platform

> Devoleum web app platform MERN stack & Redux.

## Description
Devoleum is an open source web app that organizes data from physical or digital supply chains into authentic stories. Thanks to Devoleum it is possible to notarize the steps of a supply chain in an immutable way on blockchains and other distributed systems, using cryptographic hashes that allow data verification and a high degree of privacy. Each story shows in a clear and detailed way the steps that contributed to making the product unique and precious.

## Usage

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

## Contributors ✨
Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://it.linkedin.com/in/lorenzo-zaccagnini"><img src="https://avatars2.githubusercontent.com/u/18169376?s=400&u=697698bf9973ab54be5b8eadbf7d1c7c083d23e6&v=4" width="100px;" alt=""/><br /><sub><b>Lorenzo Zaccagnini</b></sub></a><br /><a href="https://it.linkedin.com/in/lorenzo-zaccagnini" title="LinkedIn">💬</a> <a href="https://github.com/LorenzoZaccagnini" title="GitHub">📖</a></td>
   </tr>
    <td align="center"><a href=" "><img src="https://avatars1.githubusercontent.com/u/22495052?s=400&u=bfa41aa3de72d097e172add801860178358e9362&v=4" width="100px;" alt=""/><br /><sub><b>Elisa Romondia</b></sub></a><br /><a href="https://fr.linkedin.com/in/elisa-romondia" title="LinkedIn">💬</a> <a href="https://github.com/elisaromondia" title="GitHub">📖</a></td>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!

## LICENSE

[agpl-3.0](LICENSE.md)

### Credits

Built from a fork of the Traversy Media project [MERN eCommerce From Scratch](https://github.com/bradtraversy/proshop_mern) course
