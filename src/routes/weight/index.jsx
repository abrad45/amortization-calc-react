import React, { useState, useEffect } from 'react';

import { WeightedInterestRow } from './row';

export const WeightedInterest = () => {
  const [rowCount, setRowCount] = useState(3);
  const [data, updateData] = useState([]);

  useEffect(() => {
    let defaultState = [];

    for (let i = 0; i < rowCount; i++) {
      defaultState.push({ amount: 0, interest: 0 });
    }

    updateData(defaultState);
  }, [rowCount]);

  const update = (key, index, value) => {
    const newData = [...data];
    newData[index][key] = +value;

    updateData(newData);
  };

  // Formula from http://loanconsolidation.ed.gov/help/rate.html
  let weightFactor = 0;
  let totalAmount = 0;

  for (let loan in data) {
    const { amount, interest } = data[loan];

    totalAmount += amount;
    weightFactor += amount * interest;
  }

  const weightedInterest = (weightFactor / totalAmount).toFixed(3);

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
