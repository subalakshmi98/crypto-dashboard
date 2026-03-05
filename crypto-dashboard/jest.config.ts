module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
  
    transform: {
      "^.+\\.(ts|tsx)$": [
        "ts-jest",
        {
          tsconfig: "tsconfig.test.json"
        }
      ]
    },
    moduleFileExtensions: ["ts", "tsx", "js"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
  };