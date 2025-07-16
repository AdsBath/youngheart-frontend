export interface MonthYear {
  month: number;
  year: number;
}

export function getLast12Months(): MonthYear[] {
  const months: MonthYear[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const month = currentDate.getMonth() + 1; // getMonth() is zero-based
    const year = currentDate.getFullYear();
    months.push({ month, year });

    // Move to the previous month
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  return months;
}
