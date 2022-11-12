const timeArr = ['40m 20s', '2h 70s', '3h 30m'];

const newArr = [];

const convertTime = (time) => [...time.matchAll(/(\d+)([hms])/g)].reduce((acc, match) => ({ ...acc, [match[2]]: match[1] }), {});

timeArr.forEach((element) => {
    newArr.push(convertTime(element));
});

let total = { houres: 0, minutes: 0, seconds: 0 };

niceForLoopBro:
for (let i = 0; i < newArr.length; i++) {
    if (typeof newArr[i].h !== 'undefined') total.houres += parseInt(newArr[i].h);
    if (typeof newArr[i].m !== 'undefined') total.minutes += parseInt(newArr[i].m);
    if (typeof newArr[i].s !== 'undefined') total.seconds += parseInt(newArr[i].s);
}

console.log(total);
console.log(total.minutes / 60);
console.log(Math.floor(total.seconds / 60))

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
}

function toMinutes(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m${seconds > 0 ? ` ${seconds}s` : ''}`;
}

console.log('minutes to houres:', toHoursAndMinutes(total.minutes)); // 1h 40m
console.log('seconds to minutes:', toMinutes(total.seconds))