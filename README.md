# Angular ES6 - Karma - Webpack Skeleton

An Angular ES6 boiler plate project to get you started. Write Directives/Controllers and Services using classes. Test your code using Jasmine, generate documentation using
ES6 Docs, write your style with sass, view test coverage and more.

The project uses a modular architecture where you build re-usable modules and glue them together in a container.

Install:
 - npm install
 - npm install -g esdoc

Run:

- grunt
    - Starts up the built in server and the continuous test server for development.
    - For production open a browser and go to http://localhost:7358/public/#/
    - For mocks open a browser and go to http://localhost:7359/public/#/
    
Build:

- grunt build
    - Creates a release build. Ready for deployment.

- grunt docs 
    - To generate documentation (it's stored under /target/docs)

Notes:

The grunt default task will start up a webserver on port 7358 and another server running mocks on 7359, it will also
spawn the karma server for continuous testing.

Test coverage is stored under target/coverage.

Usage & Design:

- The app/containers folder contains the glue modules that bring together all the independent modules and glue them together allowing them to pass data between each other etc.
- The service layer should be excluded from your modules, instead expose features through your directive for instance (data, onSave, isBusy) and so on. This makes things easier to test and your components are highly re-usable.
- Bring your component modules together in the container and glue them together using services and controllers, this affords you a great deal of flexibility and customization.
- Each component module should define all it's requirements this way the test entry point need only import the module and you can test, this is easier than managing dependencies on a per test basis.

Developers:

- [Wael Jammal](https://github.com/waeljammal)
- [Daniele Zurico](https://github.com/daniele-zurico)