
# P2P Wallet 
Web API for managing peer to peer wallet transactions



## Getting Started

```
git clone https://github.com/victorex27/P2PWallet.git

cd P2PWallet

npm install
```

### Prerequisites

- A browser
- Postman App
- A text editor (Vs code)
- Good internet connection
- Install Node js and npm
- Install Typescript
- Install Postgresql
- Knowledge of how to configure and use these tools will be a big plus

### Installing

- After you must have cloned the repo, use the following command to test the app

```
git clone  https://github.com/victorex27/P2PWallet.git

cd P2PWallet

npm install

```
- After installing the dependencies we need to run the migration scripts

### N.B
  config files need to be setup properly to your environment.

  - To run migration script on development environment

  ```
    npm run migration

  ```
- To revert migration , use

 ```
    npm run migration:revert
```
    
  

- To start development server
```
    npm run start:dev
```

- To build
```
    tsc --project tsconfig.build.json
```

- To start
```
    npm run start
```


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

- To run test
```
    npm run test
```


To run sample test on deployed app click [P2P Wallet Documentation](https://documenter.getpostman.com/view/5657161/VUxXKiMV)



## Deployment

- Create an acoount on heroku
- Install heroku on your system
- Run to access heroku from your cli
```
    heroku --version
    heroku login
    heroku create
```
- use this to push from your develop branch to your account on heroku
```
    git push heroku develop:develop
```

You can also create an account on [Heroku](https://www.heroku.com/) and use the GUI if command line is not your thing

A url will be displayed to you were you can use the app

 Database for staging environment is hosted on [ElephantSql](https://www.elephantsql.com)  which is a PostgreSQL as a Service tool.

This system was also developed on Ubuntu.

## Documentation
View Documentation [P2P Wallet Documentation](https://documenter.getpostman.com/view/5657161/VUxXKiMV)
And [P2P Wallet Base Url ](https://p2pwallet2.herokuapp.com//)


## Use of Software
- User has to signup in other to use the account
- User also needs to login to generate a jwt token that expires every 15 minutes
- JWT should be issued as a bearer token for each request
- User should call Initiate Fund from Bank to initiate request to Paystack. A response will be returned with the url for payment
- User should use this url to complete transaction.
- User should use the referenceId gotten from Initiate Fund Api to confirm transaction status
- User can use the Fund Transfer endpoint to make transfer to another valid account

## Built With

* [Typescript](https://www.typescriptlang.org/) - Type safety for javascript
* [Nodejs](https://nodejs.org/en/) -  JavaScript runtime built on Chrome's V8 JavaScript engine
* [Expressjs](https://expressjs.com/) -  Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Es6](https://es6.io/) - ECMA Script programming language
* [Nodemon](https://nodemon.io/) - Used  for restarting the node application when file changes in the directory
* [Nock](https://www.npmjs.com/package/nock) - HTTP server mocking and expectations library for Node.js
* [Mocha](https://mochajs.org/) 
* [Chai](https://www.chaijs.com/) - Used to generate RSS Feeds
* [Heroku](https://www.heroku.com/) - Cloud application platform used for app deployment
* [ElephantSql](https://www.elephantsql.com) - ElephantSQL - PostgreSQL as a Service
* [Paystack](https://paystack.com/) - Modern online and offline payments for Africa
## Contributing

Please raise a pull request.

## Versioning

Version 1.0.0 

## Authors

* **Obikobe Amaobi** - *Initial work* - [P2P Wallet]( https://github.com/victorex27/P2PWallet.git)



## Acknowledgments
* Hat tip to anyone whose code was used
* Inspiration

