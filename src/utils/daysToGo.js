import { differenceInDays } from 'date-fns';
export function checkDaysToGo(targetDate) {
  return differenceInDays(targetDate, new Date())
}
