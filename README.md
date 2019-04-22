# ₿ cryptocurrency-api
Cryptocurrency API that uses a web-scraper to provide real-time cryptocurrency data.
- Data is scraped and seeded into the SQLite Database. Data can then be accessed after starting your server.

## how to use
- Fork and clone the repo.
- `cd` into `scraper` and run `npm install` to install web-scraper dependencies.
- `cd` into `api` and run `yarn` to install API dependencies.
- Update the `URL` variable inside the .env.sample (found in `/api`) with the cryptocurrency site url to be scraped.
  - Get rid of the `.sample` file-ending to "activate" your .env file.
- While in `api`, run `knex migrate:latest` to create the SQLite DB.
- After creating your DB, run `knex seed:run` to seed the DB w/ the web-scraper data.
- Still inside `api`, run `yarn start` to start the API.
- API can be accessed by doing a `GET` request at `localhost:9000/coin_data`.
- Individual coin data can be accessed by doing a `GET` request at `localhost:9000/coin_data/id` making sure to substitute `id` w/ the id of the individual coin.

## web-scraper
- Cheerio
- Cheerio-Tableparser
- Request-Promise
- Dotenv

## back-end
- Node.js
- Express
- Knex
- SQLite
- Helmet
- Morgan

## authors
- Sawyer Zincone -_initial work_- [szincone](https://github.com/szincone)

## license
This project is licensed under the MIT License - see the [LICENSE](https://github.com/szincone/cryptocurrency-api/blob/master/LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)