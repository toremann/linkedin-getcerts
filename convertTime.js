const timeArr = ['30m 20s', '2h 20m 30s', '3h 30m 20s'];

const newArr = [];

const convertTime = (time) => [...time.matchAll(/(\d+)([hms])/g)].reduce((acc, match) => ({ ...acc, [match[2]]: match[1] }), {});

timeArr.forEach((element) => {
    newArr.push(convertTime(element));
});

console.log(newArr);

let sum = { houres: 0, minutes: 0, seconds: 0 };

for (let i = 0; i < newArr.length; i++) {
    if (typeof newArr[i].h == "undefined") {
      sum.houres += 0
    } else {
      sum.houres += parseInt(newArr[i].h);
    }
    
    if (typeof newArr[i].m == "undefined") {
      sum.minutes += 0
    } else {
      sum.minutes += parseInt(newArr[i].m);
    }

    if (typeof newArr[i].s == "undefined") {
      sum.seconds += 0
    } else {
      sum.seconds += parseInt(newArr[i].s);
    }
}

console.log(sum);
