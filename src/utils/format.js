export const get_current_date = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const validate_dates = (start_date, end_date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(start_date) || !regex.test(end_date)) return false;

  const today = new Date();
  const start = new Date(start_date);
  const end = new Date(end_date);

  if (start < today || end < today) throw new Error("Dates can not be in the past");
  if (end < start) throw new Error("End dates are before start date");

  return true;
}

export const difference_between_dates = (start_date, end_date) => {
  const start = new Date(start_date);
  const end = new Date(end_date);

  const total_years = end.getFullYear() - start.getFullYear();
  const total_months = end.getMonth() - start.getMonth();
  const total_days = end.getDate() - start.getDate();

  const months = (total_years * 12) + total_months + (total_days / 30);

  return months;
}