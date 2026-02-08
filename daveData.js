// Centralized site content/data.
// Technical Skills data is used to render the Technical Skills section dynamically.

export const daveData = {
  technicalSkills: {
    left: [
      { name: "SDLC", percent: 85 },
      { name: "STLC", percent: 92 },
      { name: "HTML / CSS / Bootstrap", percent: 77 },
      { name: "Javascript / jQuery", percent: 75 },
      { name: "Git", percent: 80 },
    ],
    right: [
      { name: "Selenium with Python", percent: 80 },
      { name: "Appium with Python", percent: 85 },
      { name: "Security Testing with Python", percent: 70 },
      { name: "Performance Testing with Python", percent: 70 },
    ],
  },

  caseStudies: [
    {
      title: "E2E Regression Suite Stabilization",
      tags: ["E2E", "Automation"],
      summary:
        "Built and stabilized an end-to-end regression flow with reliable waits, page-object patterns, and cleaner assertions to reduce flakiness.",
      highlights: [
        "Introduced structured test utilities and consistent patterns",
        "Improved reliability by reducing flaky selectors and timing issues",
        "Organized coverage into readable suites for faster debugging",
      ],
      stack: ["Playwright", "JavaScript", "Page Object Model"],
      links: [], // optional later: { label: "GitHub", href: "..." }
    },
    {
      title: "API Automation Harness for GraphQL & REST",
      tags: ["API", "Automation"],
      summary:
        "Created an API test harness with reusable helpers, auth handling, and clear negative-testing patterns for fast feedback and maintainability.",
      highlights: [
        "Reusable request helpers + auth utilities",
        "Clear patterns for negative tests and error parsing",
        "Faster feedback for critical API endpoints",
      ],
      stack: ["Playwright API", "Node.js", "GraphQL", "REST"],
      links: [],
    },
    {
      title: "Test Reporting & CI-Friendly Execution",
      tags: ["Process", "Automation"],
      summary:
        "Improved test visibility with structured logs and summary reporting to make failures actionable and speed up triage.",
      highlights: [
        "Readable per-test logging and failure context",
        "Suite-level summary for quick status checks",
        "Cleaner output for CI pipelines",
      ],
      stack: ["Node.js", "Custom Reporter", "CI"],
      links: [],
    },
    {
      title: "Mobile Automation Exploration",
      tags: ["Process", "Automation"],
      summary:
        "Explored mobile automation flows and validations to understand coverage needs and evaluate feasibility for scaling.",
      highlights: [
        "Basic flows validated on real devices/emulators",
        "Notes on stability and selector strategies",
        "Recommendations for scaling coverage",
      ],
      stack: ["Appium", "Python"],
      links: [],
    },
    {
      title: "Custom E2E Automation Framework with Selenide (Java)",
      tags: ["E2E", "Automation", "Process"],
      summary:
        "Designed and maintained a custom end-to-end automation framework using Selenide and Java to support reliable regression testing at scale.",
      highlights: [
        "Built reusable test utilities and base components",
        "Improved test stability through smarter waits and selector strategies",
        "Reduced maintenance cost by standardizing test patterns",
      ],
      stack: ["Selenide", "Java", "Custom Framework"],
      links: [],
    },
    {
      title: "API Validation & Data Integrity Testing with Postman",
      tags: ["API", "Process"],
      summary:
        "Validated backend APIs using Postman to ensure correct data handling, response accuracy, and integration stability across services.",
      highlights: [
        "Verified request/response contracts and edge cases",
        "Identified data inconsistencies before UI integration",
        "Supported backend teams with clear reproduction steps",
      ],
      stack: ["Postman", "REST", "JSON"],
      links: [],
    },
    {
      title: "Automated Web Testing with Playwright",
      tags: ["E2E", "Automation"],
      summary:
        "Implemented automated web tests using Playwright to validate critical user flows and prevent regressions in fast-moving environments.",
      highlights: [
        "Covered critical paths and regression scenarios",
        "Used Playwright fixtures and helpers for cleaner tests",
        "Balanced speed and reliability in CI execution",
      ],
      stack: ["Playwright", "JavaScript", "Web Automation"],
      links: [],
    },
    {
      title: "Manual Web & Mobile Testing Coverage",
      tags: ["Process"],
      summary:
        "Performed thorough manual testing across web and mobile platforms to ensure feature correctness, usability, and regression safety.",
      highlights: [
        "Executed functional, regression, and exploratory testing",
        "Validated responsive behavior and mobile-specific flows",
        "Provided clear bug reports with reproduction steps",
      ],
      stack: ["Manual Testing", "Web", "Mobile"],
      links: [],
    },
    {
      title: "STLC Ownership & End-to-End Test Process Coverage",
      tags: ["Process"],
      summary:
        "Applied structured STLC practices to ensure consistent test coverage from requirement analysis through release validation.",
      highlights: [
        "Participated in requirement reviews and test planning",
        "Designed test cases aligned with business scenarios",
        "Ensured regression readiness before releases",
      ],
      stack: ["STLC", "Test Planning", "Quality Processes"],
      links: [],
    },
  ],
};
