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

### License

`beacon-network-ui` and all it sources are released under *Apache 2.0 License*.
