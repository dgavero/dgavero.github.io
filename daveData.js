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
      tags: ["API", "Automation", "Tools"],
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
      tags: ["Tools", "Automation"],
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
      tags: ["Tools", "Automation"],
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
  ],
};
