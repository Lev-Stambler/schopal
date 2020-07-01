# Schopal

[The Design Doc](https://docs.google.com/document/d/1Kcmq8WQPmOR5ij3Ew3ZLjD97PZUZ5lFbQ5T8dc-39Ag/edit#)

## Objective

This project helps users find relevant paragraphs within scholarly articles.

## Background

Scholarly articles can often be long, and finding one which either backs up or disproves an idea can be quite difficult and time consuming. When searching for an article on a scholarly search engine, such as [Google Scholars](https://scholar.google.com/), full article texts are returned. Full articles take time to read through and may not contain the information the searcher was hoping to find.

## Overview
By starting with [EuropePMC's rest API](https://europepmc.org/RestfulWebService), this project aims to create a search engine which ranks results based on individual paragraphs. Once EuropePMC’s scholarly API is initially implemented, more scholarly APIs can be added.
This project will use the API, NLP, and basic search techniques in order to find relevant paragraphs to a search query. 
The audience for this project are end consumers looking to better understand scholarly claims and researchers looking for other journals.

Priorities:
- P0
  -  Search EuropePMC’s api for relevant articles and give each article in the paragraph a correlation score to a query
- P1
  - Create a frontend for the Search Engine
- P2
  - Improve the correlation score via an NLP classifier.
- P3
  - Add in more APIs to go alongside EuropePMC’s api
- P4
  - Mobile friendly view
  
This project will be built using Typescript. Typescript was chosen because this project involves web scraping, a frontend, and JSON objects. Typescript’s integration with JSON objects and strong typing will allow for easier scraping and integration with APIs. Typescript’s native support for promises will allow for making multiple API and web scraping calls concurrently.
Moreover, I have the most experience in Typescript and, due to the project’s short time frame, rapid development is prioritized.

[Nx](https://nx.dev/) will be used to manage the repository. Nx is a tool for managing mono repos and multi package repos. [Jest](https://jestjs.io/) will be used to run the unit tests.

## NX

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@foodmedicine/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
