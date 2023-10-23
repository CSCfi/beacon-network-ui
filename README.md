# Archival Notice
`beacon-network-ui` was developed for ELIXIR Beacon implementation studies [2018](https://elixir-europe.org/internal-projects/commissioned-services/beacon-network-service) and [2019-2021](https://elixir-europe.org/internal-projects/commissioned-services/beacon-2019-21). Development on the Beacon v1 specification has ceased, and a new Beacon v2 specification has been finalised, and is being adopted by beacon providers.

Users are encouraged to move to the next iteration of [Beacon Network UI v2](https://github.com/elixir-europe/beacon-network-ui). Beacon v2 development can be followed at [GA4GH Beacon v2 Project](https://beacon-project.io/).

We thank all parties that have been involved with us in the development of the Beacon v1 products past these years.

## Beacon Network UI

[![End-to-end tests](https://github.com/CSCfi/beacon-network-ui/actions/workflows/E2Etests.yml/badge.svg)](https://github.com/CSCfi/beacon-network-ui/actions/workflows/E2Etests.yml)
[![Unit tests and coverage](https://github.com/CSCfi/beacon-network-ui/actions/workflows/unittests.yml/badge.svg)](https://github.com/CSCfi/beacon-network-ui/actions/workflows/unittests.yml)
[![Coverage Status](https://coveralls.io/repos/github/CSCfi/beacon-network-ui/badge.svg?branch=refs/heads/unit_tests)](https://coveralls.io/github/CSCfi/beacon-network-ui?branch=refs/heads/unit_tests)

Beacon Network UI serves as a Graphical User Interface for Beacon Network APIs.

Beacon Network consumes the following APIs:
* [Beacon Network Registry](https://github.com/CSCfi/beacon-network) (holds a catalogue of all services)
* [Beacon Aggregator](https://github.com/CSCfi/beacon-network) (serves as a query gateway to beacons)
* [OIDC Client](https://github.com/CSCfi/oidc-client) (user login at ELIXIR AAI)

### Quick Start

##### Install Node Modules
```
npm install
```

##### Run Development Server
```
npm run serve
```

##### Compile Production Build
```
npm run build
```

##### Run Production Server
```
npm start
```

##### Run Unit Tests
```
npm test
```

##### Run Unit Test Coverage
```
npm run coverage
```

##### Run E2E Tests
```
npx cypress run
```

### Build and run with Docker

```
docker build --build-arg VUE_APP_REGISTRY_URL=<url> --build-arg VUE_APP_AGGREGATOR_URL=<url> -t cscfi/beacon-network-ui .
docker run -p 8080:8080 cscfi/beacon-network-ui -d
```

### License

`beacon-network-ui` and all it sources are released under *Apache 2.0 License*.
