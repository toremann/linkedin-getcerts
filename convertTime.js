const timeArr = ['40m 20s', '2h 30s', '3h 30m'];

const newArr = [];

const convertTime = (time) => [...time.matchAll(/(\d+)([hms])/g)].reduce((acc, match) => ({ ...acc, [match[2]]: match[1] }), {});

timeArr.forEach((element) => {
    newArr.push(convertTime(element));
});

let sum = { houres: 0, minutes: 0, seconds: 0 };

niceForLoopBro:
for (let i = 0; i < newArr.length; i++) {
    if (typeof newArr[i].h !== 'undefined') sum.houres += parseInt(newArr[i].h);
    if (typeof newArr[i].m !== 'undefined') sum.minutes += parseInt(newArr[i].m);
    if (typeof newArr[i].s !== 'undefined') sum.seconds += parseInt(newArr[i].s);
}

console.log(sum);
console.log(sum.minutes / 60);
console.log(Math.floor(sum.seconds / 60))

console.log(sum.houres + Math.floor(sum.minutes / 60))