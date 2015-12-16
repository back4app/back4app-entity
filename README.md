back4app entity layer implementations
=====================================

[![Build Status](
    http://jenkins.back4app.com:8080/buildStatus/icon?job=back4app-entity%20-%20master)](
    http://jenkins.back4app.com:8080/job/back4app-entity%20-%20master/)

## Table of contents

* [Getting Started] (#getting-started)
* [Dependencies] (#dependencies)
* [Gulp] (#gulp)
* [Building Files] (#building-files)
* [Best Practices] (#best-practices)
* [Publishing] (#publishing)

### Getting Started

First of all, you need to install Node.js. To help you to manage different
version of Node.js in your system is recommended that you use nvm. nvm is a
Node.js version manager. Using it you will be able to have how many Node.js
versions you want. To install it run this command:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
```

or

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
```

To enable the nvm, close and reopen the terminal.
Now you can install the most recent stable version of Node.js. To do this just
run this command:

```
nvm install stable
```

For further information about nvm check its [repository](
https://github.com/creationix/nvm).

### Dependencies

To install all dependencies you should run this command:

```
npm install
```

### Gulp

Gulp is included on Development Dependencies. Running the previous command might install it.
To install gulp you should run this command:

```
npm install gulp --global
```

#### Gulp Tasks

##### lint

This task is used to maintain the established standards on code style and avoid syntax errors.
  
It uses `gulp-jshint` and `gulp-jscs`.

### Best Practices

* You should follow the configuration files, using it on your IDE.
They're `.editorconfig`, `.jscsrc` and `.jshintrc`.

* Try to always remember to run lint:
```
gulp lint
```
* Create tests to any new major interactions, or changed ones.

* Follow the code comment standards for documentations.

### Publishing

To publish a new *patch* version, checkout the `master` branch, pull the latest changes and run the following commands:

```
$ gulp dist
$ git add . & git commit -m 'Update version'
$ npm version patch
$ git push && git push --tags
$ npm publish
```

The new version should be accessible on npm.
