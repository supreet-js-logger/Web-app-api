# Web-app-api

Web-app-api

# JS-Logger

Logging all the front end information in logger which will help you identify error or bugs on production site

# Installation process

## Server app setup process

- Clone this repo in your application
- Go to JS-looger folder and run command `npm install`
- To execute server side test cases `npm run test`
- To get server side test cases code coverage `npm run test:coverage`

## Client app setup process

- Go to client folder and run command `npm install`
- To execute clinet side test cases Go to client folder and run command `npm run test`
- To get client side test cases code coverage Go to client folder and run command `npm run test:coverage`

your app is ready now just few more configurations to do.

- Check [deployment notes](DeploymentNotes.md)

At this point you should be able to access below apps

- [Base app](http://logger.com:3000/)
- [Api app](http://api.logger.com:3000)
- [React app](http://app.logger.com:8080/)

# Tech stack

- mongodb
- express
- react
- node

Need to finish basic [Task list](TASKLIST.md)

# Migrations

Commands related to migratios

- `npm run migrate_status` to check status of all the migrations
- `npm run migrate_up` to migrate up
- `npm run migrate_down` to migrate down
- `npm run migrate-mongo {}` to run any migrate-mongo command
  eg : `npm run migrate-mongo create users` for create user migration
