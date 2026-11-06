# AGENTS.md

This repository is a Playwright test automation project using TypeScript. Most work should stay in the `tests/` directory and use the Playwright Test API.

## Project overview
- Entry points:
  - `playwright.config.ts` configures the test runner, browsers, reporters, and shared `use` settings.
  - `tests/` contains the specs.
  - `package.json` defines the available commands.
- Default test runner: Playwright Test
- Reporters configured: HTML (`playwright-report/`) and Allure (`allure-results/`, generated into `allure-report/`)

## Working conventions
- Keep tests small, clear, and independent. Prefer `test.describe(...)` + `test(...)` blocks, and use Playwright fixtures like `page` and `request` when needed.
- Prefer user-facing locators such as `getByRole`, `getByLabel`, and `getByText` over fragile CSS selectors.
- Use assertions from `@playwright/test` such as `toBeVisible`, `toHaveURL`, `toHaveTitle`, and `toBeTruthy` for browser and API validations.
- Avoid introducing brittle timing assumptions. Prefer Playwright auto-waits and explicit assertions.
- Do not edit generated artifacts under `playwright-report/`, `allure-report/`, `allure-results/`, or `test-results/` unless the task explicitly requires updating generated output.

## Commands
- Run all tests: `npm test`
- Run Playwright directly: `npx playwright test`
- Generate Allure HTML report: `npm run allure:generate`
- Open the generated Allure report: `npm run allure:open`

## Helpful patterns for agents
- If a task adds a new browser flow, keep it in a new or existing spec under `tests/` and follow the project’s style of straightforward `page.goto(...)` + locator + assertions.
- Prefer targeted runs when debugging a single spec: `npx playwright test tests/<file>.spec.ts --project=chromium`
- Keep browser coverage consistent with the configured projects in `playwright.config.ts`.

## References
- Playwright docs: https://playwright.dev/docs/
- Allure Playwright integration: https://allurereport.org/docs/playwright/
