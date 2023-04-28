# Next.js Clone Jira

If you want to test this app, you need:

1) postman
2) mongoCompass
3) docker

To run locally, the database is needed
```
docker-compose up -d
```
* El -d, significa __detached__

* MongoDB URL local:
```
mongodb://localhost:27017/entriesdb
```

## Setting environment variables
Rename file __.env.template__ to __.env__

## Populate the database with test information

use in postman: 
```
http://localhost:3000/api/seed
```
