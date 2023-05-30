const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "squ_3fabcb77e28d9f7f814e9969c20f37a2ded20faf",
    options: {
      "sonar.sources": "./src/pages, ./src/components",
      "sonar.exclusions": "**/*.test.tsx, **/*.test.ts, **/*.test.js, src/components/Layout/Navbar.tsx, src/pages/NotFound/NotFound.tsx, src/pages/InsertData/SubmitButton.tsx, src/pages/LoginProtected/LoginProtected.tsx",
      "sonar.tests": "./src/pages, ./src/components",
      "sonar.test.inclusions":
        "./src/**/*.test.tsx, ./src/**/*.test.ts, ./src/**/*.test.js",
    },
  },
  () => process.exit()
);
