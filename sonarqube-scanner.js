const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "squ_1ddeacd71bd962242ccaeaf45fac2b6298231ce1",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/*.test.tsx, **/*.test.js",
      "sonar.tests": "./src",
      "sonar.test.inclusions":
        "./src/**/*.test.tsx,./src/**/*.test.js",
    },
  },
  () => process.exit()
);
