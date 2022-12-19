# Search App

This is a basic search application that performs queries against the Google and Bing search engines.

A user can enter a string of search text into a search bar, select a search engine (or both) from a dropdown menu, and then execute the selected search query against the chosen search engine.

## Running the application

It is recommended to run this application on a Mac by using Docker Desktop with Docker Compose version 2.

The latest version of Docker Desktop can be downloaded here: https://www.docker.com/products/docker-desktop/

## Running the application locally

Start up Docker Desktop. Click the gear icon and go to general settings. Make sure the Docker Compose v2 checkbox is checked. Open your terminal and navigate to a suitable directory. Run the following commands to clone the repository and start the application using Docker:

```
git clone git@github.com:travisoverby/searchApp.git
cd searchApp
yarn dc:start
```

Open your browser and navigate to `localhost:3001` once the React development server has started.

#### Note: if you are using an older version of Docker Desktop (not v2), you will need to change the following line in searchApp/package.json

`"dc:start": "docker compose up --build",` to `"dc:start": "docker-compose up --build",`

## Alternative method to run the application locally

Install homebrew on your Mac, if not already installed:

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

Install a recent version of ruby using homebrew:

`brew install ruby`

Clone the git repository, navigate to the project root, and install project dependenciesL

```
git clone git@github.com:travisoverby/searchApp.git
cd searchApp
yarn dev:init
```

Finally, run each of the below `yarn` commands in their own terminal windows:

```
yarn dev:start:server
yarn dev:start:client
```

Open your browser, and navigate to `localhost:3001` if the browser does not open automatically.

## To do and further thoughts

Items that could be immediately done to improve the quality of the code in this repository:

Write unit tests for all code. `react-testing-library` and Jest could be used for testing rendering of React components. Dummy state data could be used.

Tests need to be written for the Rails API. Happy path responses for `SearchEngine::QueryHandler` can be mocked. Error responses can also be mocked.

Error handling needs work on both Rails API and the React front-end.

`SearchEngine::QueryHandler` can be pulled into a more appropriate `model` class to adhere to Rails practices.

End-to-end tests could be written using a framework like Cypress or Selenium.
