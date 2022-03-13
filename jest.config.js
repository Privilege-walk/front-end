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
    transform: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/fileTransformer.js',
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
};

module.exports = config;