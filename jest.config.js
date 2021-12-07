module.exports = {
  roots: ["<rootDir>/src"],
  verbose: true,
  moduleFileExtensions: ["js", "ts", "tsx", "json", "vue"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  testURL: "http://localhost/",
  collectCoverage: true,
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: ["<rootDir>/tests/unit/vueSetup.js"],
  coverageReporters: ["text", "html", "lcov"],
  coverageDirectory: "jest-coverage",
};
