module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "**/*.js",                 // Includes all .js files in all directories
        "!**/node_modules/**",     // Excludes files in node_modules
        "!**/tests/**",            // Excludes files in tests directory, if you don't want to cover test files
      ],
  };
  