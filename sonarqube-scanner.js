const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "squ_477ca03f63177296853a563793d9efe20337b328",
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
