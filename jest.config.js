const config = {
    "verbose": true,
    "testPathIgnorePatterns": [
      "/node_modules/",
      "/jspm_packages"
    ],
    "unmockedModulePathPatterns": [
      "./node_modules/react"
    ],
    roots: [
      "../__tests__"
    ],
    modulePaths: [
      "./__stubs__"
    ],
};

module.exports = config;