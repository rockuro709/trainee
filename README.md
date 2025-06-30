#README.md
It's Anton Tratseuski's trainee project.
App: https://www.discogs.com/
Tech stack: TypeScript, Playwright, ESLint, Prettier

There are four projects in playwright.config:

"auth-ui"
testDir: "./tests/ui/authenticated/"
uses fixture "webAuth" for acceptance cookies and accurate working in headless-mode for authorized tests (anti-bot system) and "globalSetup" for authorized tests.

"guest-ui"
testDir: "./tests/ui/guest/"
uses fixture "web" for acceptance cookies and unauthorized tests.

"fixture-logout-ui"
testDir: "./tests/ui/logout/"
uses fixture "webLoggedIn" exclusively for acceptance cookies and logout test from authorized state without(!) "globalSetup".

name: "api"
testDir: "./tests/api/"
uses fixture "api" for authorized API-tests.

я использую просто web для теста на логин, использую api для тестов на чистое апи, использую webLoggedIn для логаута, использую webAuth для тестов, требующих авторизованной страницы.
