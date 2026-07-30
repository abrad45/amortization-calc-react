import { useState, useEffect } from 'react';

import { WeightedInterestRow } from './row';

export const WeightedInterest = () => {
  const [rowCount, setRowCount] = useState(3);
  const [data, updateData] = useState([]);

  // Grow (or shrink) to rowCount while keeping whatever the user already
  // typed — rebuilding from scratch here wiped every row on "Add Loan".
  useEffect(() => {
    updateData((previousData) => {
      const nextData = previousData.slice(0, rowCount);

      while (nextData.length < rowCount) {
        nextData.push({ amount: 0, interest: 0 });
      }

      return nextData;
    });
  }, [rowCount]);

  // Replace the row rather than mutating it: [...data] is a shallow copy, so
  // assigning into newData[index] also edited the previous state's object.
  const update = (key, index, value) =>
    updateData((previousData) =>
      previousData.map((row, i) =>
        i === index ? { ...row, [key]: +value } : row
      )
    );

  // Formula from http://loanconsolidation.ed.gov/help/rate.html
  let weightFactor = 0;
  let totalAmount = 0;

  for (const { amount, interest } of data) {
    totalAmount += amount;
    weightFactor += amount * interest;
  }

  // Guard the 0/0 case: every row starts at zero, and NaN.toFixed(3) is "NaN".
  const weightedInterest = totalAmount
    ? (weightFactor / totalAmount).toFixed(3)
    : '0.000';

  return (
    <div className="interest-weight-calculation">
      <p className="pb-4">
        Quick math problem: you owe $10k at 5.25% and $20k at 6.25%. What
        percent are you paying on the $30k? That's what this form will tell you
        😉
      </p>
      <div className="is-clearfix mb-4">
        <button
          className="button is-primary is-pulled-right"
          onClick={() => setRowCount(rowCount + 1)}
        >
          Add Loan
        </button>
      </div>
      {data.map((row, i) => (
        <WeightedInterestRow key={i} index={i} data={row} update={update} />
      ))}
      {!!totalAmount && (
        <h3 className="is-size-3">
          You owe ${totalAmount} at an interest rate of {weightedInterest}%.
        </h3>
      )}
    </div>
  );
};
