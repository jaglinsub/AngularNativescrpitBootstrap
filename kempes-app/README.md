# kempes-app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Docker Command Cheat List:
## Sample command for copying file from kempesdev container
docker cp kempesdev:/var/log/nginx/log access3.log

##Sample command to enter into docker bash shell of kempesdev container
docker exec -it kempesdev /bin/bash

##list all images
docker ps or docker ps -a
docker stop kempesdev
docker rm kempesdev

##build and run command - DO NOT FORGOT THE DOT
##posrt 4300 is set in default.conf, use the same port. NGINX routes to that port
docker build -t kempesdev .
docker run -it -p 80:4300 --name=kempesdev kempesdev

##Find the log file paths for kempesdev conatiner
docker inspect --format='{{.LogPath}}' kempesdev

##Docker machine ip
docker-machine ip

##Local host does not work so use the docker-machine ip to find the ip address and use that ip
##For kempes home page use this
http://192.168.99.100/
