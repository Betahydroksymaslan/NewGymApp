import { millisecondsToMinutes } from "date-fns";

export const calcTimeLength = (timeFrom: number, timeTo: number) => {
  const countedTime = timeTo - timeFrom; //subtract miliseconds to get time to convert to minutes
  const convertedTime  = millisecondsToMinutes(countedTime) || 1
  return convertedTime;
};

export const calcAverageTime = (
  times: { timeFrom: number; timeTo: number | undefined }[] | undefined
) => {
  if (!times || times.length === 0) return 0;

  const countedTimes = times.map(
    (item) => (item.timeTo as number) - item.timeFrom
  );
  const sumTimes = countedTimes.reduce((a, b) => {return a + b}, 0) / countedTimes.length;
  const countedMinutes = Math.round(millisecondsToMinutes(sumTimes));
  
  return Math.floor(countedMinutes);
};
