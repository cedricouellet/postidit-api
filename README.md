# Postidit API

## Table of contents

- [About the project](#about)
    - [Description](#description)
    - [Built with](#built-with)
- [Getting started](#getting-started)
    - [Requirements](#requirements)
        - [Knowledge](#knowledge)
        - [Technologies](#technologies)
    - [Installation](#installation)
    - [Usage](#usage)
- [Roadmap](#roadmap)
- [License](#license)

## About the project

### Description

*Postidit* is a simple posting app,
that can also be seen as a 
micro social-media platform.

### Built with

Stack | Tool 
-|- 
Environment | [Docker](https://www.docker.com/)
Runtime | [Node.js](https://nodejs.org/en/)
Language | [TypeScript](https://www.typescriptlang.org/)
Framework | [Express.js](https://expressjs.com/)
Database | [MariaDB](https://mariadb.org/)
|
   

## Getting started

This project consists of two services:
- Server
- Database

All dependencies and data of these services will be installed/stored in the project container, 
keeping your filesystem clutter-free.

### Requirements

#### Knowledge

Before beginning development, you will need to be familiar with the following topics:

- Containerization
    - Docker
- Languages
    - JavaScript
    - TypeScript
    - JSON
    - YAML
    - Industry standards
- Environments
    - Node.js
        - CLI
        - Package manager (npm)
- Frameworks
    - Express.js
- Databases
    - MariaDB
    - MySQL
- Concepts
    - Server-side development
    - RESTful web services
    - Asynchronous programming
    - Database creation & administration 
    - Object-oriented programming
    - Functional programming
    - Compilation & transpilation
        
#### Technologies

In order to run the project container, you will need to install [Docker](https://www.docker.com/).

Developped was done using v4.4.3 of [Docker Desktop](https://www.docker.com/products/docker-desktop).


### Installation

1. Clone the repo
```
git clone https://github.com/cedricouellet/postidit-api.git
```

2. Configure the Docker envionment
    - Copy `.template.env` to a new file `.env`
    - Edit `.env` variables to fit your desired setup.

3. Start the container
```
docker-compose up
```
- **Note:** use `-d` flag to detach the console. 

4. To stop the container:
```
docker-compose down
```

### Usage

To consume the exposed API routes, 
refer to the [endpoint documentation](documentation/index.md)

## License

*Postidit API* is distributed under the MIT License. 

See [`LICENSE`](./LICENSE) for more information.

## [Back to top](#postidit-api)
