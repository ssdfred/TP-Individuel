/**
 * @param string dateString
 * Cette fonction prends une date en format string et la formate en dd/mm/YYYY
 */
export function frenchDate(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  let frenchDate = "";
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  frenchDate = `${day}/${month}/${year}`;
  return frenchDate;
}
