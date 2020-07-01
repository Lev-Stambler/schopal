# Food As Medicine

[The Design Doc](https://docs.google.com/document/d/1JxUk9ei88Z6hSeEQPahUhCcOT53X2KngqEfCtplOAbg/edit?usp=sharing)

## Objective

This project seeks to provide backup or lack thereof for commonly recommended “food as medicine” remedies through published literature and scholarly papers.

## Background

The food as medicine methodology is an idea where eating healthy foods and choosing specific foods can help remedy health issues. Many studies have been conducted to verify this approach. Studies such as [Food as Medicine: Potential Therapeutic Tendencies of Plant Derived Polyphenolic Compounds](https://pdfs.semanticscholar.org/fae8/cbb215a33657de9a8e50b4a590dd2577825b.pdf), [Balancing Herbal Medicine and Functional Food for Prevention and Treatment of Cardiometabolic Diseases through Modulating Gut Microbiota](https://www.frontiersin.org/articles/10.3389/fmicb.2017.02146/full), and many others have come out over the past 20 years. There also currently exist many sites, such as Elaine Moran Wellness, which make recommendations of certain foods for certain conditions. Some of these sites which give recommendations often do not cite scholarly sources. But, the information on these sites may still be useful.

## Overview

By using [EuropePMC's rest API](https://europepmc.org/RestfulWebService), this project aims to bridge the gap between scholarly research and sites which make easily accessible and understandable recommendations.
This project will use web scraping techniques on sites which make recommendations and then attempt to find a set of scholarly sources which back up the claims made. This relationship will then be stored in a database. Thus a user could then cross check recommended foods or use this newly assembled data to find food remedies.

The audience for this project are end consumers looking to better understand the recommendations put forth by food as medicine.

Priorities:
- P0
  - Scraped recommendations for specific symptoms or desired effects
  - A collection of articles related to the scraped recommendations
  - A table to display the recommendations and corresponding articles
- P1
  - Paragraphs selected which specifically back up or go against the food as medicine claims
- P2
  - Giving each claim a correlation score. The higher the score, the more the claim is supported by research
- P3
  - Using scientific names and synonyms for recommendations, symptoms, and desired effects to find more correlated articles
  - Use a scraper which finds all recommendations on Elaine Moran’s site
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
