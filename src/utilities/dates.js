export const getDaysInMonth = (year, month) =>
    new Date(2000 + year, 1 + month, 0).getDate();

export const isLeapYear = (year) => getDaysInMonth(year, 1) === 29;

export const getDailyInterestRate = (interest, year) =>
    interest / 100 / (isLeapYear(year) ? 366 : 365);

export const getDateString = (year, month) => {
    const m = month + 1; // F*#&ing JS

    return `${m < 10 ? `0${m}` : m}/20${year}`;
};
