module.exports = {
  moduleFileExtensions: ["js","ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/tests/**/*.(test).(js|ts)"],
  coverageReporters: ["html", "json-summary"],
};
