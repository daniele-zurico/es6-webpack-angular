# portal-works prototype

Install:
 - npm install
 - npm install -g esdoc

Run:
- grunt 
it execute in developer mode. It run continuous test integration and webpack server
Open browser and go to http://localhost:7358/public/#/

Build:

- grunt build
release build. Ready for deploy into a server

- grunt docs 
to generate documentation (it's stored under /target/docs)

Notes: 

The grunt default task will start up a webserver on port 7358 and another server running mocks on 7359, it will also
spawn the karma server for continuous testing.

Usage & Design:

- The app/containers folder contains the glue modules that bring together all the independent modules and glue them together allowing them to pass data between each other etc.
- The service layer should be excluded from your modules, instead expose features through your directive for instance (data, onSave, isBusy) and so on. This makes things easier to test and your components are highly re-usable.
- Bring your component modules together in the container and glue them together using services and controllers, this affords you a great deal of flexibility and customization.
- Each component module should define all it's requirements this way the test entry point need only import the module and you can test, this is easier than managing dependencies on a per test basis.
