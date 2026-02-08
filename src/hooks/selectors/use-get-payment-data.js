import { useGetInterest } from '.';

import {
  getDaysInMonth,
  isLeapYear,
  getDailyInterestRate,
  getDateString,
} from '/utilities/dates';

// https://stackoverflow.com/a/11832950
const roundCurrency = (val) => Math.round((val + Number.EPSILON) * 100) / 100;

export const useGetPaymentData = () => {
  const interestData = useGetInterest();
  const { balance, interestRate, payment, modifier } = Object.assign(
    {},
    interestData
  );
  let returnData = [];

  let remainingBalance = balance;
  let totalInterestPaid = 0;
  let previousBalance = balance;

  let year = new Date().getFullYear() - 2000;
  let month = new Date().getMonth();

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
      var dailyInterest = remainingBalance * dailyInterestRate;
      // 1c. Add that interest amount to the monthlyInterst counter
      monthlyInterest += dailyInterest;
      // 1d. Add that interest amount to the remainingBalance, too, so it compounds daily
      remainingBalance += dailyInterest;
    }

    // 2. If your monthly payment amount won't even cover interest,
    // you'll never pay things off, and we'll enter an infinite loop.
    // This prevents a browser crash by bailing out.
    //
    // This only matters the first iteration through the loop other than
    // in the rarest of cases. For instance, if you start in February, and
    // happen to pay $.01 over the minimum payment, then in March you might
    // trigger this issue. Either way, this is a side project and I don't
    // think it's a case worth accounting for 😬
    if (monthlyInterest > payment) {
      return {
        error: 'insufficient_payment',
      };
    } else {
      // 3. Make a payment
      remainingBalance -= payment;
      totalInterestPaid += monthlyInterest;
      
      // 4. Check if the balance is increasing after the first month.
      // If month 2 balance (after payment) is higher than month 1 balance (after payment),
      // the debt will only increase. This catches edge cases where payment equals interest.
      if (paymentCount === 2 && remainingBalance > previousBalance) {
        return {
          error: 'insufficient_payment',
        };
      }

      returnData = returnData.concat({
        monthNumber: 1 + month,
        paymentCount: paymentCount,
        remainingBalance: Math.max(0, roundCurrency(remainingBalance)),
        dateString: getDateString(year, month),
        interestPaid: roundCurrency(monthlyInterest),
        interestPaidToDate: roundCurrency(totalInterestPaid),
      });

      // Store the balance after the first month for comparison
      if (paymentCount === 1) {
        previousBalance = remainingBalance;
      }

      // Set up the next loop
      thePassageOfTime();
    }
  }

  return returnData;
};
