const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "squ_0676c516b22d955c7c8cc4b72795768d73b2ddde",
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
