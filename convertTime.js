const timeArr = ['1h 30m 20s', '2h 20m 30s', '3h 30m 20s'];

const newArr = [];

const convertTime = (time) => [...time.matchAll(/(\d+)([hms])/g)].reduce((acc, match) => ({ ...acc, [match[2]]: match[1] }), {});

timeArr.forEach((element) => {
    newArr.push(convertTime(element));
});

console.log(newArr);

const sum = newArr.reduce((previousValue, currentValue) => previousValue.h + currentValue.h, 0);

const { h } = newArr

console.log(h)

console.log('total', sum);
