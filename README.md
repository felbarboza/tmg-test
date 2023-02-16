# TMG Test

To run the following project you will need to have NodeJS installed
I used the version 16.17.1

To run the projects you must install the dependencies, check if every test is passing and start it

```sh
$ npm install
$ npm test
$ npm start
```

To check all available routes, after you start the server.
If you reach: http://localhost:3000/api-docs
You will find a swagger documentation of the project, enabling you to try it out


## Project decisions

I made it in a layered architecture, so that each route group is divided into modules and each module is organized in horizontal layers.
The main layers are: route -> controllers -> services.

And besides that, there are the containers which register the stack and store as singletons to be injected on the services.

The tests are made for two purposes, unit and integration. The unit tests have been done for the services and the integration for more complex tests between all routes.

Also added Joi validation for each route that received a parameter (on path or body)


