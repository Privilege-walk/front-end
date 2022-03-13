const config = {
    "verbose": true,
    "testEnvironment": "jsdom",
    "testPathIgnorePatterns": [
      "/node_modules/",
      "/jspm_packages"
    ],
    "unmockedModulePathPatterns": [
      "./node_modules/react"
    ],
    roots: [
      "src/components/__test__"
    ],
    modulePaths: [
      "./__stubs__"
    ],
};

module.exports = config;