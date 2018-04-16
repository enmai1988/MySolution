# Help Desk v2.0

A help desk application used by Hack Reactor students.

## Team

  - [David Gould](https://github.com/davidgould112)
  - [David Vassett](https://github.com/DavidVassett)
  - [Eric Mai](https://github.com/enmai1988)
  - [Jacob Penney](https://github.com/OneCent01)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Requirements

- Node 6.4.x
- Postgresql 9.1.x

## Development

### Installing Dependencies

```sh
npm install
```

### Setup Database

#### Install Postgres

```sh
$ brew install postgresql
```

#### Create Database

```sh
npm run db-create
```

#### Start Database

```sh
npm run db-start
```

#### Migrate and Seed Database

The below script will drop, create, and seed the database tables with sample data found in `database/sampleData.js`.

```sh
npm run db-migrate
```

#### Access Database

To access your database from within terminal use the below command.

```sh
psql helpReactor
```

Once you are connected to the database you can you the below query to update a users role.

```sh
UPDATE users SET role='admin' WHERE id=1;
```

### Start Node Server

```sh
npm run server-dev
```

### Start Webpack

```sh
npm run react-dev
```

### Roadmap

View the project roadmap [here](LINK_TO_DOC)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
