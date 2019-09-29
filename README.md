<p align="center">
  <a href="https://github.com/igorpavlov" target="blank">
    <img
      src="https://avatars2.githubusercontent.com/u/3973243?s=460&v=4"
      height="100"
      alt="Igor Pavlov's Photo" />
  </a>
  <a href="https://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" height="100" alt="Nest Logo" />
  </a>
</p>

# Description

This project is a demonstration of Nest.js usage for various purposes.

# Usage

The app is hosted at [Heroku](https://igorpavlov-nest-playground-app.herokuapp.com).

## Postcode module

Demonstrates using external API resource.
Simply call `GET: /postcode/<UK Postcode>` e.g. `/postcode/SW1A0AA`
and you will receive the postcode district (`Westminster` in this case).
This endpoint also provides instant postcode validation (without external API call)
and error handling.

# Technology demonstration

At the moment this project demonstrates:

## Stack

### Basics

- Yarn
- Nest.js
- TypeScript
- Jest
- TSlint

### Custom

- Husky (git hooks)
- Nock (HTTP mocking)

## Structure

- Modular approach
- Controllers / Services approach

## Usage

- REST routing and request params
- Calling external APIs
- Error handling

## Testing

- Unit testing
- E2E testing
- Centralised data mocking
- 100% tests coverage
- Automatic "on-commit" and "on-push" tests running

## Code health

- 100% lint compliance

# Installation

This application requires NodeJS `10.16.3 LTS`.
You may use `nvm` to install this exact version.

```bash
$ yarn install
```

# Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
# Note: If you'd like the application to run on a port other than 3000,
# please specify it in the PORT environment variable.
# Note: Please note, some services like Heroku will run the `build` script automatically.
$ yarn run build
$ yarn run start:prod
```

# Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# To Do

- Functions descriptions
- External API libraries usage
- Databases
- Sockets usage
- Smaller files (150 lines?) - to investigate if this is a must practice

# License

This project is [MIT licensed](LICENSE).
