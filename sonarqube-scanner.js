const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "squ_238ad4621e3fdce9529d95755f0ebe5f76150f74",
    options: {
      "sonar.sources": "./src/pages/Subject",
      "sonar.exclusions": "**/*.test.tsx",
      "sonar.tests": "./src/pages/Subject",
      "sonar.test.inclusions":
        "./src/pages/Subject/**/*.test.tsx, ./src/pages/Subject/**/*.test.ts",
    },
  },
  () => process.exit()
);
