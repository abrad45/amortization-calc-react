import { useGetInterest } from '.';

import {
  getDaysInMonth,
  getDailyInterestRate,
  getDateString,
} from '/utilities/dates';

// https://stackoverflow.com/a/11832950
const roundCurrency = (val) => Math.round((val + Number.EPSILON) * 100) / 100;

// A loan that takes longer than this to pay off is, practically speaking,
// never getting paid off. Bail out rather than build a giant array.
const MAX_PAYMENTS = 1200; // 100 years

export const useGetPaymentData = () => {
  const interestData = useGetInterest();
  const { balance, interestRate, payment } = Object.assign({}, interestData);
  let returnData = [];

  let remainingBalance = balance;
  let totalInterestPaid = 0;

  let year = new Date().getFullYear() - 2000;
  let month = new Date().getMonth();

  // The reducer coerces every input with `+value`, so anything the user types
  // that isn't a number arrives here as NaN. Without this, NaN propagates all
  // the way to `$NaN` in the table.
  if (!Number.isFinite(balance) || !Number.isFinite(interestRate)) {
    return { error: 'insufficient_payment' };
  }

  const thePassageOfTime = () => {
    if (month === 11) {
      month = 0;
      year++;
    } else {
      month++;
    }
  };

  for (let paymentCount = 1; remainingBalance > 0; paymentCount++) {
    let monthlyInterest = 0;
    const daysInMonth = getDaysInMonth(year, month);
    const dailyInterestRate = getDailyInterestRate(interestRate, year);

    // 1a. For each day in the month...
    for (let day = 0; day < daysInMonth; day++) {
      // 1b. Figure out the interest for the day
      const dailyInterest = remainingBalance * dailyInterestRate;
      // 1c. Add that interest amount to the monthlyInterst counter
      monthlyInterest += dailyInterest;
      // 1d. Add that interest amount to the remainingBalance, too, so it compounds daily
      remainingBalance += dailyInterest;
    }

    // 2. If your monthly payment amount won't even cover interest,
    // you'll never pay things off, and we'll enter an infinite loop.
    // This prevents a browser crash by bailing out.
    //
    // Note the `>=`: if the payment exactly equals the interest, the balance
    // never moves either. A payment of zero (which is what an emptied field
    // coerces to) at 0% interest hits that same case.
    //
    // This only matters the first iteration through the loop other than
    // in the rarest of cases. For instance, if you start in February, and
    // happen to pay $.01 over the minimum payment, then in March you might
    // trigger this issue. Either way, this is a side project and I don't
    // think it's a case worth accounting for 😬
    if (
      !Number.isFinite(payment) ||
      payment <= 0 ||
      monthlyInterest >= payment ||
      paymentCount > MAX_PAYMENTS
    ) {
      return {
        error: 'insufficient_payment',
      };
    } else {
      // 3. Make a payment
      remainingBalance -= payment;
      totalInterestPaid += monthlyInterest;

      returnData = returnData.concat({
        monthNumber: 1 + month,
        paymentCount: paymentCount,
        remainingBalance: Math.max(0, roundCurrency(remainingBalance)),
        dateString: getDateString(year, month),
        interestPaid: roundCurrency(monthlyInterest),
        interestPaidToDate: roundCurrency(totalInterestPaid),
      });

      // Set up the next loop
      thePassageOfTime();
    }
  }

  return returnData;
};
