# Amortization Calculator

## Demo

[Demo hosted at Netlify](https://compassionate-roentgen-a6a345.netlify.app)

When are you going to pay off your student loan? How much could you save if you just paid $25 or $50 more a month? Arm yourself with the knowledge you need to quickly pay off your student loans with this amortization (loan payoff) calculator. All you need to know is the amount of your loan, your interest rate and your monthly payment. You can modify your monthly payment to see how much interest you'll save by paying off more quickly, or reduce your interest rate to see how a refinance would help.

If you have multiple loans at different interest rates, we can help you to find your weighted average interest rate, too!

## Prior Art

See <https://github.com/abrad45/amortization-calc>

This page is meant to show off my coding ability and, to an extent, philosophies, but also to... be a quick side project. I ported over the code from the above repo in a weekend, rewriting all the UI, learning [Bulma](https://bulma.io) and trying to get things up and running quickly without totally reinventing the wheel. Some behind the scenes notes:

* Vite was adopted in 2026 to avoid "div-ops" as much as possible. I used parcel before; vite is even simpler.
* I looked into D3.js and while I think I could use it here, it seems like a lot of overkill. Chart.js worked pretty well.
* I'm not thrilled with the data-managing code for the weighted-interst calc. It does what it needs to do, but yikes.
* Speaking of some yikes code, the loop for calculating interest is largely lifted from my 2015 code. I'm sure I could scrap it all and rewrite it now in a better way, but again, this works for a side project

### Simple improvements

* I think I'm fetching from hooks a bit too often
* I should allow your modifier to be toggled from % to $.

## Notes about Calculations

* Interest is calculated and compounds daily. Your exact payment date during the month is not taken into consideration. Your loan provider may calculate things slightly differently, and so these values may not be perfectly accurate for you.
* **This is for the purpose of making estimates and semi-informed financial decisions only. I'm not liable for any decisions you make, nor will I stand by any of these calculations at any time.**

## Installation

Make sure you have these (or similar) before continuing:

* `nodejs` (see `.nvmrc` for version)
* `yarn` v1.22+

_Note_: This project utilizes eslint. If you're using Visual Studio Code, the setting `eslint.packageManager` may need to be set to `yarn` in order for linting to work.

1. `nvm use`
2. `yarn install`
3. `yarn start`
4. Open `localhost:1234`

## Testing

This project uses [Vitest](https://vitest.dev/) for unit testing with comprehensive test coverage.

### Running Tests

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test run

# Run tests with coverage report
yarn test:coverage
```

### Coverage Requirements

The project enforces 90% code coverage thresholds for:
- Statements
- Branches
- Functions
- Lines

Coverage reports are generated in the `coverage/` directory and can be viewed by opening `coverage/index.html` in your browser.

### CI/CD

The CI pipeline runs automatically on pull requests and will fail if:
- Any tests fail
- Code coverage drops below 90% for any metric
- The build fails

All checks must pass before code can be merged to the main branch.
